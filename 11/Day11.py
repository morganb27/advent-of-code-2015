PASSWORD = 'cqjxjnds'

def is_valid(p):
    straight = False
    pairs = set()
    if any(x in ['i', 'o', 'l'] for x in p):
        return False
    for i in range(len(p) - 2):
        if ord(p[i]) == ord(p[i+1]) - 1 == ord(p[i+2]) - 2:
            straight = True
        if p[i] == p[i+1]:
            pairs.add((p[i], p[i+1]))
    if p[-1] == p[-2]:
        pairs.add((p[-1], p[-2]))
    return straight and len(pairs) >= 2

def next_password(p):
    if p == 'z':
        return 'a'
    if p[-1] == 'z':
        return next_password(p[:-1]) + 'a'
    return p[:-1] + chr(ord(p[-1]) + 1)

for _ in range(2):
    while True:
        PASSWORD = next_password(PASSWORD)
        if is_valid(PASSWORD):
            print("Next valid password is:", PASSWORD)
            break
    