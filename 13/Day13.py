import fileinput
import re
from collections import defaultdict
from itertools import permutations

PUZZLE = [line.strip() for line in fileinput.input()]
graph = defaultdict(dict)

def parse_input(line):
    p1, p2 = line.split(' ')[0], line.split(' ')[-1][:-1]
    val = int(re.findall(r'\d+', line)[0])
    if "lose" in line:
        val *= -1
    return p1, val, p2

def calculate_happiness(data):
    total_happiness = float('-inf')
    for line in data:
        p1, val, p2 = parse_input(line)
        graph[p1][p2] = val
    for perm in permutations(graph.keys()):
        total = 0
        for i in range(len(perm)):
            total += graph[perm[i]][perm[(i+1) % len(perm)]]
            total += graph[perm[(i+1) % len(perm)]][perm[i]]
        if total > total_happiness:
            total_happiness = total
    return total_happiness


print(f"Total happiness is: {calculate_happiness(PUZZLE)}")

#Add myself for part 2
for p in graph.keys():
    graph[p]['MorganB'] = 0

graph['MorganB'] = {person: 0 for person in graph.keys()}

def total_happiness_part_2():
    total_happiness = float('-inf')
    for perm in permutations(graph.keys()):
        total = 0
        for i in range(len(perm)):
            total += graph[perm[i]][perm[(i+1) % len(perm)]]
            total += graph[perm[(i+1) % len(perm)]][perm[i]]
        if total > total_happiness:
            total_happiness = total
    return total_happiness


print(f"Total happiness for part 2: {total_happiness_part_2()}")