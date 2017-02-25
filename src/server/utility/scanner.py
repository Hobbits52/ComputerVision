

from imutils.perspective import four_point_transform
from imutils import contours as imutilsContours
import numpy as np
import argparse
import imutils
import cv2 as cv
import urllib
import json
import sys

print 'hello'
# print ' <==========  Running scanner.py =========>'

# Since Python script called as child process, reads URL data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def url_to_image(url):
	# download the image, convert it to a NumPy array, and then read
	# it into OpenCV format
	resp = urllib.urlopen(url)
	image = np.asarray(bytearray(resp.read()), dtype="uint8")
	# Dev Question: Could we optimize next line by reading in grayscale?
	image = cv.imdecode(image, cv.IMREAD_COLOR)
	# return the image
	return image

test1resizedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487791060/test1resized_v0swpw.jpg'
test3resizedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487791152/test3resized_xsgeaq.jpg'
testurl = test3resizedURL

def scan_image():
	url = read_in()

	image = url_to_image(url)

	# convert to grayscale
	gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

	# grab edges (the Canny method blurs before grabbing edges)
	edged = cv.Canny(gray, 75, 200)

	# find contours. (Note: this alters original, so use copy of edged image)
	contours = cv.findContours(edged.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[0] if imutils.is_cv2() else contours[1]
	documentContours = None
	 

	# Dev Note: should handle error gracefully if no contours are found

	# find the largest contour (which should be the paper)
	contours = sorted(contours, key=cv.contourArea, reverse=True)

	# loop over the sorted contours
	for c in contours:
		# approximate the contour
		perimeter = cv.arcLength(c, True)
		approx = cv.approxPolyDP(c, 0.02 * perimeter, True)

		# make sure contour has four points
		if len(approx) == 4:
			documentContours = approx
			break

	# DevNote: uncomment below to show contours on original image
	# cv.drawContours(image, contours, -1, (0,255,0), 3)

	# straighten grayscale image. Note: also straightening original to keep for development/debugging
	testImage = four_point_transform(image, documentContours.reshape(4, 2))
	testGray = four_point_transform(gray, documentContours.reshape(4, 2))

	# threshold image, so everything either black/white
	thresh = cv.threshold(testGray, 0, 255,
		cv.THRESH_BINARY_INV | cv.THRESH_OTSU)[1]

	# find contours again, to find the bubbles in top half of paper
	contours = cv.findContours(thresh.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[0] if imutils.is_cv2() else contours[1]

	# Dev Note: Should handle errors gracefully of no contours found

	#sort contours by area
	contours = sorted(contours, key=cv.contourArea, reverse=True)
	# the text box at bottom of document will be the largest contour remaining
	textBoxContour = contours[0]

	# now we need to know the height of the textBox. One good way to do this
	# is to read the height off the rectangle that bounds the textBox contour
	x,y,w,h = cv.boundingRect(textBoxContour)
	cv.rectangle(testImage,(x,y),(x+w,y+h),(0,255,0),2)

	# now crop out the textBox at the bottom, to leave only the answers up top
	# DEV NOTE, would need to get bottom later to read USER_ID
	answerSheet = testImage[0:y]
	answerSheetThresh = thresh[0:y]

	# now get contours again -- searching for bubbles this time
	contours = cv.findContours(answerSheetThresh.copy(), cv.RETR_EXTERNAL,
		cv.CHAIN_APPROX_SIMPLE)
	contours = contours[0] if imutils.is_cv2() else contours[1]

	bubbles = []

	# the bubbles will be just those contours with appropriate height and width
	for c in contours:
		x,y,w,h = cv.boundingRect(c)
		# the width and height should each be between 18 and 25. DevNote: adjust if we change incoming image
		if 18 <= w <= 25:
			if 18 <= h <= 25:
				bubbles.append(c)

	# DevNote: should handle error gracefully if there aren't 140 bubbles found.
	# print "this many bubbles =>"
	# print len(bubbles)

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
			# 220 seems to be a good cutoff point. The non-bubbled range from 90-150. Bubbled in tends to be over 300.
			# DevNote: we might need to adjust cutoff point when we change image size that we accept.
			if total >= 220:
				answers[i].append(circlesToLetters[j])
				# print total


	# print/return answers. Note: We are allowing multiple bubbles to be selected per question.
	# print answers

	#answerJSON = json.dumps(answers)
	#print answerJSON
	testdata = {}
	#stestdata['id'] = int(idString,4)  #convert idString to base4 integer
	testdata['status'] = 200
	testdata['URL'] = url
	testdata['answers'] = answers
	data = json.dumps(testdata)
	print data;
	# import json
	# >>> json.dumps([1,2,3,{'4': 5, '6': 7}], separators=(',',':'))
	# '[1,2,3,{"4":5,"6":7}]


# DevNote: These are placeholder tests until we hook up our node and python. Should print TRUE for each with image3
# print answers[1][0] == 'a'
# print answers[2][0] == 'c'
# print answers[3][0] == 'b'
# print answers[4][0] == 'd'
# print answers[5][0] == 'e'
# print answers[6][0] == 'c'
# print len(answers[1]) == 1
# print len(answers[2]) == 1
# print len(answers[3]) == 1
# print len(answers[4]) == 1
# print len(answers[5]) == 1
# print len(answers[6]) == 1
# print len(answers[7]) == 0
# print len(answers[8]) == 0
# print len(answers[9]) == 0
# print len(answers[10]) == 0
# print len(answers[11]) == 0
# print len(answers[12]) == 0
# print len(answers[13]) == 0
# print len(answers[14]) == 0
# print len(answers[15]) == 0
# print len(answers[16]) == 0
# print len(answers[17]) == 0
# print len(answers[18]) == 0
# print len(answers[19]) == 0
# print len(answers[20]) == 0
# print len(answers[21]) == 0
# print len(answers[22]) == 0
# print len(answers[23]) == 0
# print len(answers[24]) == 0
# print len(answers[25]) == 0
# print len(answers[26]) == 0
# print len(answers[27]) == 0
# print len(answers[28]) == 0


# GUI stuff ***** Leaving in for development/debugging

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


scan_image()
# if __name__ == '__main__':
#     scan_image()