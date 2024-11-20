virtualenv -p python3.10 python_stt && \
    source python_stt/bin/activate && \
    python -m pip install -U pip && \
    pip install --upgrade wheel setuptools && \
    pip install openai-whisper && \
    echo "Whisper installed" && \
    exit