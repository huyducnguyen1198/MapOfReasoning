#!/bin/bash

# Navigate to the Python backend directory and start the server
cd backend/
python server.py &
PID_PYTHON=$!


# Navigate to the React frontend directory and start the project
cd ../frontend/reactsearch 
npm start &
PID_JS=$!

# Wait for any process to exit
wait $PID_PYTHON
wait $PID_JS

# Kill remaining jobs if any process exits
kill $(jobs -p)


