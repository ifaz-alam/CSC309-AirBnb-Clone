#!/bin/bash
sudo apt-get install python3-pip python-dev
pip3 install virtualenv
python3.9 -m venv venv
sudo apt-get install libjpeg-dev -y
sudo apt-get install zlib1g-dev -y
sudo apt-get install libpng-dev -y
source venv/bin/activate
pip3 install -r packages.txt

# Install frontend dependencies
npm i ./frontend/restify --prefix ./frontend/restify