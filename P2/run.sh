#!/bin/bash
source venv/bin/activate
./restify/manage.py makemigrations accounts comments images notifications properties reservations
./restify/manage.py migrate
./restify/manage.py runserver