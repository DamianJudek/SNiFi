#!/bin/sh

gunicorn -b 0.0.0.0:5000 app:app --reload &
python3 auto_processor.py