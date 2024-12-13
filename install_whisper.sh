#!/bin/bash

if test -d ./venv; then
    echo "Virtual environnement found."
    source ./venv/bin/activate && \
    echo "Entered venv"
else
    echo "Virtual environnement not found. Creating it." && \
    { # try
        virtualenv -p python3.10 venv || virtualenv -p python3.11 venv || virtualenv -p python3.9 venv
        source ./venv/bin/activate
        python -m pip install -U pip && \
        pip install --upgrade wheel setuptools && \
        echo "venv created"
    } || { # catch
        echo "venv creation failed. Check if you have all the dependencies installed." && \
        exit
    } && \
    echo "Installing dependencies..." && \
    pip install --upgrade openai-whisper
fi