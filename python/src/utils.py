import time
import matplotlib.pyplot as plt
import uuid
import os

def time_parser(Ltime):
    Ltime = int(Ltime) / 1000
    Ltime = time.localtime(Ltime)

    date = {"year": Ltime.tm_year, "month": Ltime.tm_mon}

    if date['month'] > 11:
        date['month'] = 11
    elif date['month'] > 6:
        date['month'] = 6
    else:
        date['month'] = 11
        date['year'] -= 1

    return date

def generate_plot(props):
    """ generate plot """
    plt.figure()
    plt.pie(props["data"], labels=props["labels"], autopct="%3.2f%%")
    plt.legend(loc="best")

    root_folder = os.path.dirname(os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    ))

    """ saving plot """
    filename = "{uuid}.png".format(uuid=generate_uuid(6))
    plt.savefig(filename, dpi=300)

    """ moving plot to correct folder """
    original = os.path.join(root_folder, filename)
    new = os.path.join(root_folder, "python/static", filename)
    os.replace(original, new)

    return filename


def generate_uuid(number):
    return uuid.uuid4().hex[:number].upper()
