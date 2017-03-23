from imutils.perspective import four_point_transform
from imutils import contours as imutilsContours
import numpy as np
import argparse
import imutils
import cv2 as cv
import urllib
import json

data = {}

def scan_image(url):
	# data is our object to return. Helper functions have closure over data object.
	# helpers change data['status'] when they fail.
	global data
	data['URL'] = url
	data['status'] = 200
	# get image from url
	image = url_to_image(url)

	# find paper in image, 4-point transform
	paperGray = find_paper(image)
	if data['status'] == 400:   # error handling
		data = json.dumps(data)
		return data

	# split image into AnswerSheet (top) and IDSheet (bottom)
	answerSheetThresh, idSheetThresh = split_paper(paperGray)

	# get answers
	answers = get_answers(answerSheetThresh)
	if data['status'] == 400:  # error handling
		data = json.dumps(data)
		return data

	data['answers'] = answers

	# get studentID
	idString = get_id(idSheetThresh)
	if data['status'] == 206:  # error handling
		data = json.dumps(data)  # DEV TO DO: More error handling on invalid ID string.
		return data
	data['StudentId'] = int(idString,4)  #convert idString to base4 integer
	data = json.dumps(data)
	return data


def url_to_image(url):
	# download the image, convert it to a NumPy array, and then read into OpenCV format
	resp = urllib.urlopen(url)
	image = np.asarray(bytearray(resp.read()), dtype="uint8")
	image = cv.imdecode(image, cv.IMREAD_COLOR) # DEV: optimize by reading in Grayscale?
	return image

# DEV To Do: should modularize the scan_image code.
#def scan_image(url):
	# print ' <==========  Running scanner.py =========>'
	# get image from url
	#image = url_to_image(url)


def find_paper(image):
	global data
	# convert to grayscale, grab edges (don't need to blur image, Canny method does this)
	gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
	edged = cv.Canny(gray, 75, 200)

	# find contours. (this alters original, so use copy of edged image)
	# (the retrieval mode (cv.RETR_EXTERNAL) will not find nested contours)
	contours = cv.findContours(edged.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[0] if imutils.is_cv2() else contours[1]

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
	# Client should relay message to User
	if documentContours is None:
		data['status'] = 400
		data['message'] = 'Paper not found. Make sure image in overlay box '
		return data

	# Error handling when largest four-cornered contour isn't approximate size of what paper should be.
	# Client should relay message to User.
	if perimeter < 2600 or perimeter > 4500:
		data['status'] = 400
		data['message'] = 'Paper not found. Make sure image has a clear background, and box overlay outlines paper.'
		return data# DEV: try alternate approaches when image has "textured" background.
	
	# straighten grayscale image.
	return four_point_transform(gray, documentContours.reshape(4, 2))


def split_paper(paperGray):
	# threshold image, so everything either black/white
	thresh = cv.threshold(paperGray, 0, 255,  # DEV: may want to play with thresh limits, to capture different pens/pencils.
		cv.THRESH_BINARY_INV | cv.THRESH_OTSU)[1]
	# find contours, to find text box at bottom of document.
	contours = cv.findContours(thresh.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[0] if imutils.is_cv2() else contours[1]

	# the text box at bottom will be largest contour by area
	contours = sorted(contours, key=cv.contourArea, reverse=True)
	textBoxContour = contours[0]

	# now we need to know the height of the textBox. One good way to do this
	# is to read the height off the rectangle that bounds the textBox contour
	x,y,w,h = cv.boundingRect(textBoxContour)

	# now separate the answerSheet (top) from the idSheet (bottom)
	answerSheetThresh = thresh[0:y]

	# we only need the right half of the ID sheet ==> which is why (w/2)
	# Also squeezing out edges with +-3, so we can find ID bubbles later
	# Without squeezing out, the RETR_EXTERNAL doesn't work, since bubbles will be child nodes
	# (and RETR_EXTERNAL seems to be the only retrieval method that doesn't duplicate bubbles)
	idSheetThresh = thresh[y:y+h, x+(w/2)+3:x+w-3]  # will use idSheet later

	return (answerSheetThresh, idSheetThresh)

def get_answers(answerSheetThresh):
	global data
	# get contours again -- to search for bubbles
	contours = cv.findContours(answerSheetThresh.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[0] if imutils.is_cv2() else contours[1]

	bubbles = []

	# the bubbles will be just those contours with appropriate height and width
	for c in contours:
		x,y,w,h = cv.boundingRect(c)
		# most bubbles have a width/height around 27-28 pixels. Upper bound increases if student goes outside bubble
		if 23 <= w <= 34:
			if 23 <= h <= 34:
				bubbles.append(c)

	# Error handling when not 140 bubbles found
	# Possible Cause: image out of focus, or angle overly distorted.
	# Client should relay similar message to User
	# e.g., http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892449/a5qapleh05dob9bsisl3.jpg
	# DEV TO DO: find bubbles in link above. Perhaps bounding Rect not the best technique. Maybe try convex Hull or minimum closing circle? Also play with Contour Retrieval Method and Approximation.
	if len(bubbles) != 140:
		data['status'] = 400
		data['message'] = 'could not find all bubbles -- check image quality or photo angle'
		return data

	# split into left and right bubbles
	bubbles = imutilsContours.sort_contours(bubbles,
		method="left-to-right")[0]

	bubblesLeft = bubbles[:70]
	bubblesRight = bubbles[70:]

	# sort bubblesLeft and bubblesRight from top to bottom so we can group bubbles into questions
	bubblesLeft = imutilsContours.sort_contours(bubblesLeft,
		method="top-to-bottom")[0]

	bubblesRight = imutilsContours.sort_contours(bubblesRight,
		method="top-to-bottom")[0]

	# get questions
	questions = {}

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
			mask = np.zeros(answerSheetThresh.shape, dtype="uint8")
			cv.drawContours(mask, [questions[i][j]], -1, 255, -1)
			mask = cv.bitwise_and(answerSheetThresh, answerSheetThresh, mask=mask)
			total = cv.countNonZero(mask)
			# 350 seems to be a good cutoff point. Most bubbled in are over 500. Not bubbled around 120-200. Leave some upper space for pencil erased.
			# DEV: Check with other pens, lighting, etc.
			if total >= 350:
				answers[i].append(circlesToLetters[j])

	return answers

def get_id(idSheetThresh):
	global data
	# find contours (RETR_EXTERNAL works here because idBubble contours are not children - we cropped out bounding rectangle on form
	contours = cv.findContours(idSheetThresh.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[0] if imutils.is_cv2() else contours[1]

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
		data['status'] = 206
		data['message'] = 'could not read 32 id bubbles. check photo quality'
		return

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

	idString = ''   # DEV TO DO: More error handling with idString (e.g., student filled in two bubbles in row, or skipped)
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
	return idString


# URLs for Development / Debug

# Each is pretty standard shot (of same answer key):
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489173282/prn9pepikh7jbgpvbrm9.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489173208/qb3vzxhvq7j2rrtspuql.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489173066/fsuf7w3es6legdunq5tf.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489172330/uwexe9clmpc72cwdqevs.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489171760/uey1y9twfiqaqeduplbs.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489171618/lelakfo0etcruo6guoho.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489172961/z0edbtb0l83sgpefzjoo.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489131555/s9ya7wmu94dr2hzympqh.jpg'


# Different background:
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1489125242/csid0qghuh1g64kd04qr.jpg'

# Other images:
# sampleURL = 'sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg'

# ************

# DEV TO DO: These black pen images do not currently work
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488670680/ngx0eff2rdwojfln0yl4.jpg'
# sampleURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488670898/alyzmvcwdrsfyzd0yscp.jpg'

# ************

# print scan_image(sampleURL)


	# Examples of GUI stuff
	# ***** Leave in for development/debugging  *****

	# cv.rectangle(testImage,(x,y),(x+w,y+h),(0,255,0),2)
	# cv.drawContours(answerSheet, circle2, -1, (0,255,0), 3)
	# cv.imshow('image',image)
	# cv.imshow('mask', mask)

	# # Escape will quit
	# k = cv.waitKey(0)
	# if k == 27:         
	#     cv.destroyAllWindows()