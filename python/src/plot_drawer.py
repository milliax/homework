import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import uuid
import os

def draw_country(dataframe):
    print(dataframe)
    trans_dataframe = dataframe[["country"]].to_numpy().flatten()
    # print(trans_dataframe)

    country, cnt = np.unique(trans_dataframe, return_counts=True)

    plt.pie(cnt, labels=country,autopct="%3.2f%%")
    plt.legend(loc="upper left")

    root_folder = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    ##  saving plot
    filename = "{uuid}.png".format(uuid=uuid.uuid4().hex[:6].upper())
    plt.savefig(filename,dpi=300)

    ## moving plot
    original = os.path.join(root_folder,filename)
    new = os.path.join(root_folder,"python/static",filename)
    os.replace(original,new)

    return filename


def draw_energy(dataframe):
    return "hello"


def draw_manufacturer(dataframe):
    return "Hello"
