from os import sep
from src.fetch_data import fetch_list
from flask import Flask, request, send_from_directory
import pandas as pd
import urllib.request as req
#from dotenv import load_dotenv
from src.utils import time_parser
from src.plot_drawer import draw_countability, draw_country, draw_energy, draw_manufacturer
# load_dotenv()
import multiprocessing
from flask_cors import CORS
from flask import jsonify
import json

app = Flask(__name__)
CORS(app)

# test route


@app.route("/")
def home():
    return "Good"

# actual route


@app.route("/callback", methods=["POST"])
async def callback():
    #jsons = request.get_json()
    date = time_parser(int(request.json["time"]))
    
    """ Getting the initial data parallelly"""

    print("deploy jobs")
    results = []

    # creating multiprocessing pool
    pool = multiprocessing.Pool(5)

    # deploying works
    input = [{
        "year": date["year"],
        "month": date["month"],
        "page": page
    } for page in range(1, 6)]
    #print(input)
    results = pool.map_async(fetch_list, input)

    """ Collecting data """
    results.wait()

    seperated_DF = []

    for page in range(1, 6):
        location = "python/dataframe{page}.csv".format(page=page)
        dataframe = pd.read_csv(location)
        seperated_DF.append(dataframe)

    allDF = pd.concat(seperated_DF, ignore_index=True)

    """ returning pictures """
    files = []
    for e in request.json["methods"]:
        file = {}
        if e == "country":
            file["mode"] = "Country"
            file["src"] = draw_country(allDF)
            files.append(file)
        elif e == "energy":
            file["mode"] = "Energy"
            file["src"] = draw_energy(allDF)
            files.append(file)
        elif e == "manufacturer":
            file["mode"] = "Macufacturer"
            file["src"] = draw_manufacturer(allDF)
            files.append(file)
        elif e=="countability":
            file["mode"] = "Countability"
            file["src"] = draw_countability(allDF)
            files.append(file)

    return jsonify(files)


@app.get("/shutdown")
def shutdown():
    shutdown_func = request.environ.get('werkzeug.server.shutdown')
    if shutdown_func is None:
        raise RuntimeError('Not running werkzeug')
    shutdown_func()
    return "Shutting down..."


@app.get("/picture/<path:path>")
def send_picture(path):
    return send_from_directory('static', path)


if __name__ == "__main__":
    # main()
    app.run(host="0.0.0.0", port=7999, use_reloader=False, debug=False)
