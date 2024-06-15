import fileinput
import re
import json

DOCUMENT = [line.strip() for line in fileinput.input()][0]
PARSEDDOCUMENT = json.loads([line.strip() for line in fileinput.input()][0])

print(f"Sum of all numbers for part 1: {sum(int(x) for x in re.findall(r'-?\d+', DOCUMENT))}")

def no_red_sum(data):
    sum = 0
    if isinstance(data, list):
        for item in data:
            sum += no_red_sum(item)
    if isinstance(data, dict):
        if 'red' in data.values():
            return 0
        for value in data.values():
            print(value)
            sum += no_red_sum(value)
    if isinstance(data, int):
        sum += data
    return sum
        


print(no_red_sum(PARSEDDOCUMENT))