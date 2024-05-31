#!/bin/bash

echo "Starting gunicorn..."
gunicorn -b 0.0.0.0:5000 app:app --reload &
GUNICORN_PID=$!

sleep 10

echo "Starting auto_processor.py..."
python3 /app/auto_processor.py &
AUTO_PROCESSOR_PID=$!

echo "Gunicorn PID: $GUNICORN_PID"
echo "auto_processor.py PID: $AUTO_PROCESSOR_PID"

wait $GUNICORN_PID $AUTO_PROCESSOR_PID

echo "Processes finished with exit codes $?."

exit $?