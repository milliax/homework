import os
from dotenv import load_dotenv
load_dotenv()
import time
import pandas as pd

from src.fetch_data import fetch_list  

def main():
    print("program started")

    now_time = time.localtime()
    date = {"year": now_time.tm_year,"month": now_time.tm_mon}

    if date['month'] > 11:
        date['month'] = 11
    elif date['month'] > 6:
        date['month'] = 6
    else:
        date['month'] = 11
        date['year'] -= 1

    result1 = fetch_list({
        "year": date['year'],
        "month": date['month'],
        "page": 1
    })
    result2 = fetch_list({
        "year": date['year'],
        "month": date['month'],
        "page": 2
    })
    result3 = fetch_list({
        "year": date['year'],
        "month": date['month'],
        "page": 3
    })
    result4 = fetch_list({
        "year": date['year'],
        "month": date['month'],
        "page": 4
    })
    result5 = fetch_list({
        "year": date['year'],
        "month": date['month'],
        "page": 5
    })


    print(pd.concat([result1,result2,result3,result4,result5],ignore_index=True))





if __name__ == "__main__":
    main()