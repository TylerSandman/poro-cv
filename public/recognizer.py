#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      Tyler
#
# Created:     28/12/2014
# Copyright:   (c) Tyler 2014
# Licence:     <your licence>
#-------------------------------------------------------------------------------
import cv2
import os
import argparse
import sys
import json

def main(argv):

    parser = argparse.ArgumentParser(description='Detect poros in an image')
    parser.add_argument('img', metavar='image', type=str,
                        help='Path to the image file')
    args = parser.parse_args(argv)

    path = args.img
    classifierPath = "public/poro_classifier.xml"

    cclassifier = cv2.CascadeClassifier(classifierPath)
    '''
    for root, dirs, files in os.walk(path):
        for i in range(1,40):
            for j in range(1, 5):
                for k in range (20, 40):
                    numFound = []
                    for file in files:
                        imgPath = os.path.join(path, file)
                        img = cv2.imread(imgPath, cv2.CV_LOAD_IMAGE_COLOR)
                        rects = cclassifier.detectMultiScale(img, scaleFactor=1 + i*0.05, minNeighbors=j,
                                                             minSize=(k, k))
                        numFound.append(len(rects))
                    if all(n == 1 for n in numFound):
                        print "Scale: " + str(1 + i*0.05) + " , minNeighbours: " + str(j) + " , minSize: " + str(k)
        '''
    img = cv2.imread(path, cv2.CV_LOAD_IMAGE_COLOR)
    rects = cclassifier.detectMultiScale(img, scaleFactor=1.2, minNeighbors=2)
    if (len(rects) > 0):
        detected = True
    else:
        detected = False
    print json.dumps({"detected" : detected})

if __name__ == '__main__':
    main(sys.argv[1:])
