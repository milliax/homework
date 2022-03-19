from bs4 import BeautifulSoup
import urllib.request as req
import time
import pandas as pd
import re
import asyncio

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"

async def fetch_request(url):
    request = req.Request(url,headers={
        "User-Agent": USER_AGENT
    })
    with req.urlopen(request) as response:
        data = await response.read().decode("utf-8")
    return data

async def fetch_list(data):
    link = "https://www.top500.org/lists/top500/list/{year}/{month}/?page={number}".format(year=data["year"],month=data["month"],number=data["page"])
    print(link)
    return "Happy"
    """ fetching data """
    body = fetch_request(link)

    """ Parse Data """
    data = BeautifulSoup(body,"html.parser")
    print("data parsing")
    
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
            name = row[1].find_all("a")[0].text
            name = name.split(",")[0]
            row_data.append(name)
        """ Parsing Manufactor """
        try:
            manufactor = re.search("<\/a> [a-zA-Z0-9_\- \/.,]+\n",str(row[1])).group(0)
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
    return DataFrame

