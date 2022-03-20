import time

def time_parser(Ltime):
    Ltime = int(Ltime) / 1000
    Ltime = time.localtime(Ltime)

    date = {"year": Ltime.tm_year, "month": Ltime.tm_mon}

    if date['month'] > 11:
        date['month'] = 11
    elif date['month'] > 6:
        date['month'] = 6
    else:
        date['month'] = 11
        date['year'] -= 1
    
    return date