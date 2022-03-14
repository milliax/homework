from bs4 import BeautifulSoup
import urllib.request as req
import time

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"

def fetch_list():
    now_time = time.localtime()
    date = {"year": now_time.tm_year,"month": now_time.tm_mon}
    print(date["year"],date["month"])
