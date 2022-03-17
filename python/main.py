from src.fetch_data import fetch_list
from flask import Flask, request
import pandas as pd
import urllib.request as req
import asyncio
from dotenv import load_dotenv
from src.utils import time_parser
from src.plot_drawer import draw_country, draw_energy, draw_manufacturer
load_dotenv()

app = Flask(__name__)

# test route
@app.route("/")
def home():
    return "Good"

# actual route
@app.route("/callback", methods=["POST"])
async def callback():
    date = time_parser(request.json["time"])

    """ Getting the initial data parallelly"""
    # create a coroutine
    #allDF = loop.run_until_complete(handle_callback(date))
    # create a coroutine
    print("create loop")
    loop = asyncio.get_event_loop()
    print("deploy jobs")
    
    seperated_DF = loop.run_until_complete(asyncio.gather(
        *[fetch_list({
            "year": date["year"],
            "month": date["month"],
            "page": page
        }) for page in range(1,6)]
    ))
    
    loop.close()
    print("loop closed")
    #dataframe = pd.concat(seperated_dataFrame, ignore_index=True)
    allDF = pd.concat(seperated_DF, ignore_index=True)
    """ returning pictures """
    file_name = []
    for e in request.json["methods"]:
        if e == "country":
            file_name.append(draw_country(allDF))
        elif e == "energy":
            file_name.append(draw_energy(allDF))
        elif e == "manufacturer":
            file_name.append(draw_manufacturer(allDF))

    return {
        "file_name": file_name
    }


if __name__ == "__main__":
    # main()
    app.run(host="0.0.0.0", port=3000, use_reloader=False, debug=False)
