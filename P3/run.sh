#!/bin/bash
source venv/bin/activate
gnome-terminal -- bash -c "cd frontend/restify && npm start"

./backend/restify/manage.py makemigrations accounts comments images notifications properties reservations
./backend/restify/manage.py migrate
./backend/restify/manage.py runserver
