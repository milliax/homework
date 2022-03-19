#!/bin/sh

PORT=3000

FLASK_APP=python/main.py FLASK_ENV=develpment flask run --port $PORT
