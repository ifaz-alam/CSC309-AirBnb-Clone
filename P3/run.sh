#!/bin/bash
source venv/bin/activate
gnome-terminal -- bash -c "cd frontend/restify && npm start"

rm -rf ./backend/restify/migrations/*
rmdir ./backend/restify/migrations
./backend/restify/manage.py makemigrations accounts comments images notifications properties reservations
./backend/restify/manage.py migrate
./backend/restify/manage.py runserver