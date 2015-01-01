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
    img = cv2.imread(path, cv2.CV_LOAD_IMAGE_COLOR)
    rects = cclassifier.detectMultiScale(img, scaleFactor=1.1, minNeighbors=5, minSize=(25, 25))
    if (len(rects) > 0):
        detected = True
    else:
        detected = False
    print json.dumps({"detected" : detected})

if __name__ == '__main__':
    main(sys.argv[1:])
