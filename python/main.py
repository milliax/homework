from aiohttp import ClientSession
from src.fetch_data import fetch_list
from flask import Flask, request
import pandas as pd
import os
import asyncio
from dotenv import load_dotenv
from src.utils import time_parser
from src.plot_drawer import draw_country, draw_energy, draw_manufacturer
load_dotenv()

app = Flask(__name__)


@app.route("/")
def home():
    return "Good"


@app.route("/callback", methods=["POST"])
async def callback():
    date = time_parser(request.json["time"])

    """ Getting the initial data parallelly"""
    loop = asyncio.get_event_loop()
    
    task = [asyncio.create_task(fetch_list({
            "year": date["year"],
            "month": date["month"],
            "page": i+1
        }) for i in range(5))]

    seperated_dataFrame = await loop.run_until_complete(asyncio.gather(*task))
    dataframe = pd.concat(seperated_dataFrame, ignore_index=True)

    """ returning pictures """
    file_name = []
    for e in request.json["methods"]:
        if e == "country":
            file_name.append(draw_country(dataframe))
        elif e == "energy":
            file_name.append(draw_energy(dataframe))
        elif e == "manufacturer":
            file_name.append(draw_manufacturer(dataframe))

    return {
        "file_name": file_name
    }


async def fetch_data(date):
    
    results = []
    """ building thread """
    async with ClientSession() as session:
        tasks = [asyncio.create_task()]

        """ push works """
        results = await asyncio.gather(*tasks)
    
    data = pd.concat(results, ignore_index=True)

    return data

if __name__ == "__main__":
    # main()
    app.run(host="0.0.0.0", port=3000)
