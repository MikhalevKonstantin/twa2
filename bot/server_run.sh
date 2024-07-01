#!/bin/bash

cd /home/ubuntu/tonchi_chat_bot/
source /home/ubuntu/tonchi_chat_bot/venv/bin/activate

echo "Running the Tonchi Bot..."
until TG_API_TOKEN="" \
python3 main.py; do
	echo "\nRestarting the bot...\n"
	sleep 1
done

/home/ubuntu/tonchi_chat_bot/venv/bin/deactivate
