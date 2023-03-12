#!/bin/bash
sudo apt-get install python3-pip python-dev
pip install virtualenv
virtualenv venv
sudo apt-get install libjpeg-dev -y
sudo apt-get install zlib1g-dev -y
sudo apt-get install libpng-dev -y
source venv/bin/activate
pip install -r packages.txt