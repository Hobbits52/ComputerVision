import json
import sys
from scanner_util import url_to_image, scan_image


# Since Python script called as child process, reads URL data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def scanner():
	url = read_in()
	print scan_image(url)

if __name__ == '__main__':
    scanner()