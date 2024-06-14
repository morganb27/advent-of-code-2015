import fileinput
from collections import defaultdict
from itertools import permutations

ROUTES = [line.strip() for line in fileinput.input()]

def shortest_distance(data):
    graph = defaultdict(dict)
    shortest = float('inf')
    for line in data:
        left, distance = line.split(' = ')
        origin, destination = left.split(' to ')
        graph[origin][destination] = distance
        graph[destination][origin] = distance
    for perm in permutations(graph.keys()):
        print(perm)
        current_sum = 0
        for i in range(len(perm) - 1):
            current_sum += int(graph[perm[i]][perm[i+1]])
        if current_sum < shortest:
            shortest = current_sum
    return shortest

print(shortest_distance(ROUTES))