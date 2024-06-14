from collections import defaultdict

PUZZLE = '1113122113'

def cycle(s):
    d = defaultdict(int)
    i = 0
    d[s[0]] = 1
    res = ''
    for i in range(1, len(s)): 
        if s[i] == s[i-1]:
            d[s[i]] += 1
        else:
            res += str(d[s[i-1]]) + s[i-1]
            d[s[i]] = 1
        if i == len(s) - 1:
            res += str(d[s[i]]) + s[i]
    return res

for _ in range(40):
    PUZZLE = cycle(PUZZLE)


print(len(PUZZLE))