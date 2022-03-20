from os import sep
from src.fetch_data import fetch_list
from flask import Flask, request, send_from_directory
import pandas as pd
import urllib.request as req
#from dotenv import load_dotenv
from src.utils import time_parser
from src.plot_drawer import draw_country, draw_energy, draw_manufacturer
#load_dotenv()
import multiprocessing

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
    
    print("deploy jobs")
    results = []
    
    ## creating multiprocessing pool
    pool = multiprocessing.Pool(5)

    ## deploying works
    input = [{
            "year": date["year"],
            "month": date["month"],
            "page": page
        } for page in range(1,6)]
    print(input)
    results = pool.map_async(fetch_list,input)
    
    """ Collecting data """
    results.wait()
    
    seperated_DF = []
    
    for page in range(1,6):
        location = "python/dataframe{page}.csv".format(page=page)
        dataframe = pd.read_csv(location)
        seperated_DF.append(dataframe)
    
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

@app.get("/shutdown")
def shutdown():
    shutdown_func = request.environ.get('werkzeug.server.shutdown')
    if shutdown_func is None:
        raise RuntimeError('Not running werkzeug')
    shutdown_func()
    return "Shutting down..."

@app.get("/picture/<path:path>")
def send_picture(path):
    return send_from_directory('static',path)

if __name__ == "__main__":
    # main()
    app.run(host="0.0.0.0", port=3000, use_reloader=False, debug=False)
