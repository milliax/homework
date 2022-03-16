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
    dataframe = await fetch_data(date)

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
    print("program started")
    print(date["year"])
    print(date["month"])

    group = asyncio.gather(*[fetch_list({
        "year": date['year'],
        "month": date['month'],
        "page": i+1
    }) for i in range(5)])

    results = asyncio.get_event_loop().run_until_complete(group)
    data = pd.concat(results, ignore_index=True)

    return data

if __name__ == "__main__":
    # main()
    app.run(host="0.0.0.0", port=3000)
