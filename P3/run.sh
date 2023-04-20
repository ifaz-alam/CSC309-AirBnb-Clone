#!/bin/bash
source venv/bin/activate
gnome-terminal -- bash -c "cd frontend/restify && npm start"

rm -rf ./backend/restify/migrations/*
# rmdir ./backend/restify/migrations
python3 ./backend/restify/manage.py makemigrations accounts comments images notifications properties reservations
python3 ./backend/restify/manage.py migrate
python3 ./backend/restify/manage.py runserver