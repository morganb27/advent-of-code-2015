import fileinput
import re
from collections import defaultdict

PUZZLE = [line.strip() for line in fileinput.input()]

TAPE = {
    "children": 3,
    "cats": 7,
    "samoyeds": 2,
    "pomeranians": 3,
    "akitas": 0,
    "vizslas": 0,
    "goldfish": 5,
    "trees": 3,
    "cars": 2,
    "perfumes": 1
    }

def aunt_sue(data):
    d = defaultdict(dict)
    for line in data:
        id, p1, v1, p2, v2, p3, v3 = parse_input(line)
        d[id][p1], d[id][p2], d[id][p3]= v1, v2, v3
    for key, gifts in d.items():
        if all(TAPE[item] == value for item, value in gifts.items()):
            return d[key], key
    return -1

def aunt_sue_part_2(data):
    d = defaultdict(dict)
    for line in data:
        id, p1, v1, p2, v2, p3, v3 = parse_input(line)
        d[id][p1], d[id][p2], d[id][p3]= v1, v2, v3
    for key, gifts in d.items():
        if all(TAPE[item] < value if item in ['cats', 'trees'] else
               TAPE[item] > value if item in ['pomeranians', 'goldfish'] else
               TAPE[item] == value
               for item, value in gifts.items()):
            return d[key], key
    return -1


def parse_input(line):
    left, right = line.split(':', 1)
    id = re.findall(r'\d+', left)[0]
    gifts = right.split(',')
    p1, v1 = gifts[0].strip().split(':')
    p2, v2 = gifts[1].strip().split(':')
    p3, v3 = gifts[2].strip().split(':')
    return id, p1, int(v1), p2, int(v2), p3, int(v3)


print(f"Aunt Sue is: {aunt_sue(PUZZLE)}")
print(f"Aunt Sue is: {aunt_sue_part_2(PUZZLE)}")