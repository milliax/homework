#!/bin/sh

PORT=7999

FLASK_APP=python/main.py FLASK_ENV=develpment flask run --port $PORT
