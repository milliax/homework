from bs4 import BeautifulSoup
import urllib.request as req
import time
import pandas as pd
import re

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"

def fetch_request(url):
    request = req.Request(url,headers={
        "User-Agent": USER_AGENT
    })
    with req.urlopen(request) as response:
        data = response.read().decode("utf-8")
        return data

def fetch_list():
    now_time = time.localtime()
    date = {"year": now_time.tm_year,"month": now_time.tm_mon}
    
    """ Reformatting the correct format of URI  """

    if date['month'] > 11:
        date['month'] = 11
    elif date['month'] > 6:
        date['month'] = 6
    else:
        date['month'] = 11
        date['year'] -= 1
    
    """ Data fetching """

    fetch_url = "https://www.top500.org/lists/top500/list/{year}/{month}/?page={number}".format(year=date["year"],month=date["month"],number=1)
    print("fetch_url",fetch_url)
    response = fetch_request(fetch_url)

    data = BeautifulSoup(response,"html.parser")
    #print(data.prettify())

    """ copy html table without title """
    
    Computer_list = data.find_all("table")[0].find_all("tr")[1:]

    python_table = []

    for element in Computer_list:
        ## print(element)
        row_data = []
        
        row = element.find_all("td")
        
        
        """ Parsing country name """
        try:
            country = re.search("<br\/>((\w+ \w+ \w+)|(\w+ \w+)|(\w+))\n",str(row[1])).group(0)
            country = country.split("<br/>")[1]
            country = country.split("\n")[0]
            row_data.append(country)
        except:
            row_data.append("failed to fetech")
            print(str(row[1]))
            print("Unsupported format - country")

        """ Parsing name """
        try:
            row_data.append(row[1].find_all("b")[0].text)
        except:
            print("Unsupported format - name")
            print(row[1])
            row_data.append("No name")
        
        """ Parsing Manufactor """
        try:
            manufactor = re.search("<\/a> [a-zA-Z0-9_ \/.,]+\n",str(row[1])).group(0)
            manufactor = manufactor.split("</a>")[1]
            manufactor = manufactor.split("\n")[0]
            row_data.append(manufactor)
        except:
            row_data.append("failed to fetch")
            print(str(row[1]))
            print("Unsupported format - manufactor")

        for e in row[2:]:
            row_data.append(e)

        row_data.append(row[1].find_all("a")[0].get("href"))
        python_table.append(row_data)
    
    DataFrame = pd.DataFrame(python_table,columns=["country","Name","Manufactor","cores","Rmax","Rpeak","Power","link"])
    print(DataFrame)
    
