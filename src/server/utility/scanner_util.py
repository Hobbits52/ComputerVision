from imutils.perspective import four_point_transform
from imutils import contours as imutilsContours
import numpy as np
import argparse
import imutils
import cv2 as cv
import urllib
import json


def url_to_image(url):
	# download the image, convert it to a NumPy array, and then read
	# it into OpenCV format
	resp = urllib.urlopen(url)
	image = np.asarray(bytearray(resp.read()), dtype="uint8")
	# Dev Question: Could we optimize next line by reading in grayscale?
	image = cv.imdecode(image, cv.IMREAD_COLOR)
	# return the image
	return image

# DEV To Do: should modularize the scan_image code.
def scan_image(url):
	# print ' <==========  Running scanner.py =========>'
	# get image from url
	image = url_to_image(url)

	# convert to grayscale
	gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

	# grab edges (the Canny method blurs before grabbing edges)
	edged = cv.Canny(gray, 75, 200)

	# find contours. (Note: this alters original, so use copy of edged image)
	# the retrieval mode (cv.RETR_EXTERNAL) will not find nested contours.
	contours = cv.findContours(edged.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[1]

	# find the largest contour (which should be the paper)
	contours = sorted(contours, key=cv.contourArea, reverse=True)

	# loop over the sorted contours
	documentContours = None
	for c in contours:
		# approximate the contour
		perimeter = cv.arcLength(c, True)
		approx = cv.approxPolyDP(c, 0.02 * perimeter, True)

		# approx will be first contour with four points
		if len(approx) == 4:
			documentContours = approx
			break

	# Error handling if no four-point contours are found
	# This will catch, e.g., a blank black screen.
	# catches: 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487893886/oi5gzyf9sxfho6d76kza.jpg'
	# Also would catch tiny paper. Client should tell User to make sure paper in overlay box.
	if documentContours is None:
		data = {}
		data['URL'] = url
		data['status'] = 400
		data['message'] = 'contours not found'
		data = json.dumps(data)
		return data

	# Error handling when largest four-cornered contour isn't approximate size of what paper should be
	# This will catch most shots of random stuff (e.g., shots not including paper)
	# Or perhaps most commonly, when there is a 'textured' background behind the image (see second example below)
	# DEV NOTE: To Do: try alternate approaches to catpure textured background.
	# catches: 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487890828/b88ppddfapchcielmif8.jpg'
	# catches: 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487912476/mqktwohow3gbycofb1xq.jpg'
	if perimeter < 2300 or perimeter > 3200:
		data = {}
		data['URL'] = url
		data['status'] = 400
		data['message'] = 'paper not found'
		data = json.dumps(data)
		return data


	# DEV NOTE: could do additional error handling here E.g., if photo angle was off. Check approx features.


	# straighten grayscale image. Note: also straightening original to keep for development/debugging
	testImage = four_point_transform(image, documentContours.reshape(4, 2))
	testGray = four_point_transform(gray, documentContours.reshape(4, 2))

	# threshold image, so everything either black/white
	thresh = cv.threshold(testGray, 0, 255,
		cv.THRESH_BINARY_INV | cv.THRESH_OTSU)[1]

	# find contours again, to find the bubbles in top half of paper
	contours = cv.findContours(thresh.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[1]




	#sort contours by area
	contours = sorted(contours, key=cv.contourArea, reverse=True)
	# the text box at bottom of document will be the largest contour remaining
	textBoxContour = contours[0]

	# now we need to know the height of the textBox. One good way to do this
	# is to read the height off the rectangle that bounds the textBox contour
	x,y,w,h = cv.boundingRect(textBoxContour)

	# DEV: uncomment below for GUI stuff while developing
	# cv.rectangle(testImage,(x,y),(x+w,y+h),(0,255,0),2)
	# cv.drawContours(testImage, textBoxContour, -1, (0,255,0), 3)


	# now separate the answerSheet (top) from the idSheet (bottom)
	# DEVNOTE: we only need the "thresh" versions, below. Leaving in 'answerSheet' and
	# 'idSheet' for development purposes, but should be removed before deploy
	answerSheet = testImage[0:y]
	answerSheetThresh = thresh[0:y]

	# we only need the right half of the ID sheet ==> which is why (w/2)
	# Also squeezing out edges with +-3, so we can find ID bubbles later
	# Without squeezing out, the RETR_EXTERNAL doesn't work, since bubbles will be child nodes
	# (and RETR_EXTERNAL seems to be the only retrieval method that doesn't duplicate bubbles)
	idSheet = testImage[y:y+h, x+(w/2)+3:x+w-3] 
	idSheetThresh = thresh[y:y+h, x+(w/2)+3:x+w-3]  # will use idSheet later
	
	# now get contours again -- searching for bubbles this time
	contours = cv.findContours(answerSheetThresh.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[1]

	bubbles = []
	notBubbles = []

	# the bubbles will be just those contours with appropriate height and width
	for c in contours:
		x,y,w,h = cv.boundingRect(c)
		# most bubbles have a width/height around 25-26 pixels. Upper bound increases if student goes outside bubble
		if 23 <= w <= 30:
			if 23 <= h <= 30:
				bubbles.append(c)
		# else:
		# 	notBubbles.append(c)


	# Error handling when not 140 bubbles found
	# Possible Cause: image out of focus, or angle overly distorted.
	# Client should tell user to check focus to make sure image not blurry
	# e.g., http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892449/a5qapleh05dob9bsisl3.jpg
	# To Do: find bubbles in link above. Perhaps bounding Rect not the best technique. Maybe try convex Hull or minimum closing circle? Also play with Contour Retrieval Method and Approximation.
	if len(bubbles) != 140:
		data = {}
		data['URL'] = url
		data['status'] = 400
		data['message'] = 'could not find all bubbles -- check image quality'
		data = json.dumps(data)
		return data

	# split into left and right bubbles
	bubbles = imutilsContours.sort_contours(bubbles,
		method="left-to-right")[0]

	bubblesLeft = bubbles[:70]
	bubblesRight = bubbles[70:]

	# now sort bubblesLeft and bubblesRight from top to bottom so we can group bubbles into questions
	bubblesLeft = imutilsContours.sort_contours(bubblesLeft,
		method="top-to-bottom")[0]

	bubblesRight = imutilsContours.sort_contours(bubblesRight,
		method="top-to-bottom")[0]

	# get questions
	questions = {}

	# DEV: uncomment below for GUI stuff while developing
	# cv.drawContours(answerSheet, notBubbles, -1, (0,255,0), 3)
	# cv.drawContours(answerSheet, bubbles, -1, (0,255,0), 3)
	# cv.imshow('answerSheet',answerSheet)
	# cv.imshow('answerSheetThresh',answerSheetThresh)


	for i in range(14):
		answerChoices = bubblesLeft[i*5:i*5+5]
		# for each batch of five bubbles that make up a question, sort them left-to-right so we know which
		# bubble corresponds to which answer choice
		answerChoices = imutilsContours.sort_contours(answerChoices,
			method="left-to-right")[0]
		questions[i+1] = answerChoices
	for i in range(15,29):
		answerChoices = bubblesRight[(i-15)*5:(i-15)*5+5]
		answerChoices = imutilsContours.sort_contours(answerChoices,
			method="left-to-right")[0]
		questions[i] = answerChoices

	# now we need to find which answers are selected
	answers = {}

	circlesToLetters = {
		0: 'a',
		1: 'b',
		2: 'c',
		3: 'd',
		4: 'e'
	}

	# loop through questions
	for i in range(1,29):
		answers[i] = [];
		# loop through each of the question's five answer choices
		for j in range (0,5):
			# put a mask over the entire image, except for the bubble. Then count how many pixels are filled in.
			mask = np.zeros(thresh.shape, dtype="uint8")
			cv.drawContours(mask, [questions[i][j]], -1, 255, -1)
			mask = cv.bitwise_and(thresh, thresh, mask=mask)
			total = cv.countNonZero(mask)
			# 280 seems to be a good cutoff point. DEV: Check with other pens, lighting, etc.
			if total >= 280:
				answers[i].append(circlesToLetters[j])


	# Assemble testData
	# Note: We are allowing multiple bubbles to be selected per question.
	# Doing this here so if we can't read student ID, we can still return answers without ID.
	testdata = {}
	testdata['URL'] = url
	testdata['answers'] = answers

	# now get id info

	# find contours, (changing retrieval method since bubbles will be nested)
	contours = cv.findContours(idSheetThresh.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[1]

	idBubbles = []

	# the id bubbles will be just those contours with appropriate height and width
	for c in contours:
		x,y,w,h = cv.boundingRect(c)
		# most bubbles have a width/height around 17-19 pixels. Upper bound increases if student goes outside bubble
		if 15 <= w <= 22:
			if 15 <= h <= 22:
				idBubbles.append(c)


	# if there aren't 32 idBubbles, return partial results
	if len(idBubbles) != 32:
		testdata['status'] = 206
		testdata['message'] = 'could not read 32 id bubbles. check photo quality'
		data = json.dumps(data)
		return data

	# else read bubbles

	# sort left to right to find rows
	idBubbles = imutilsContours.sort_contours(idBubbles,
		method="left-to-right")[0]

	idBubbleRows = {}
	row = 1
	for index in range(0,29,4):
		unsorted = []
		for i in range(0,4):
			unsorted.append(idBubbles[index+i])
		idBubbleRows[row] = imutilsContours.sort_contours(unsorted,
			method="top-to-bottom")[0]
		row += 1

	idString = ''
	idStringStart = False
	idStringValid = True
	# iterate through rows
	for i in range(1,9):
		row = idBubbleRows[i]
		for j in range(0,4):
			# put a mask over the entire image, except for the bubble. Then count how many pixels are filled in.
			mask = np.zeros(idSheetThresh.shape, dtype="uint8")
			cv.drawContours(mask, [idBubbleRows[i][j]], -1, 255, -1)
			mask = cv.bitwise_and(idSheetThresh, idSheetThresh, mask=mask)
			total = cv.countNonZero(mask)
			# 160 seems to be a good cutoff
			if total >= 160:
				idString += str(j)
				idStringStart = True




	# DEV TO DO: Error Handling on idString




	# successful scan
	testdata['id'] = int(idString,4)  #convert idString to base4 integer
	testdata['status'] = 200
	data = json.dumps(testdata)
	return data


	# GUI stuff 
	# ***** Leave in for development/debugging  *****

	# cv.drawContours(answerSheet, circle2, -1, (0,255,0), 3)
	# cv.imshow('image',image)
	# cv.imshow('gray', gray)
	# cv.imshow('edged', edged)
	# cv.imshow('testImage', testImage)
	# cv.imshow('thresh', thresh)
	# cv.imshow('answerSheet', answerSheet)
	# cv.imshow('answerSheetThresh', answerSheetThresh)
	# cv.imshow('mask', mask)


	# # Escape will quit
	# k = cv.waitKey(0)
	# if k == 27:         
	#     cv.destroyAllWindows()

# ***** Leave in for development/debugging  *****

# testURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892449/a5qapleh05dob9bsisl3.jpg'
# print scan_image(testURL)

# photoOfNothing = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487890828/b88ppddfapchcielmif8.jpg'
# blackScreen = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487893886/oi5gzyf9sxfho6d76kza.jpg'
# # url = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487912476/mqktwohow3gbycofb1xq.jpg'

#tableBottom = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'
#print scan_image(tableBottom)

# # data = scan_image(testURL)
# jsonDATA = scan_image(tableBottom)
# print jsonDATA
# data = json.loads(jsonDATA)
# print data
# print data['URL']
# answerJSON = data['answers']
# print answerJSON
# print answerJSON['1']
# answers = json.loads(answerJSON)
# answers = data['answers']
# # print answers
# for i in answers:
# 	print i, answers[i]
# print scan_image('http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487821845/answerkey/testkey.jpg')

