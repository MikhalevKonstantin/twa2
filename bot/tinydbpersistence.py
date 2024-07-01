from tinydb import TinyDB as tdb
from tinydb import where
from telegram.ext import DictPersistence
from logging import getLogger
import json


class TinyDBPersistence(DictPersistence):
    def __init__(self, path_to_db: str):
        self.db = tdb(path_to_db)
        self.logger = getLogger(__name__)

        self.logger.info("Loading database...")

        self.__init_database()

        chat_data_json      = self.db.search(where("chat_data").exists())[0].get("chat_data", "{}")
        user_data_json      = self.db.search(where("user_data").exists())[0].get("user_data", "{}")
        bot_data_json       = self.db.search(where("bot_data").exists())[0].get("bot_data", "{}")

        self.logger.info("Database loaded successfully.")

        super().__init__(
            chat_data_json=chat_data_json,
            user_data_json=user_data_json,
            bot_data_json=bot_data_json,
        )


    def __init_database(self) -> None:
        for key in ["chat_data", "bot_data", "user_data"]:
            if self.db.search(where(key).exists()) == []:
                self.db.insert({key: "{}"})


    def _update_database(self) -> None:
        self.logger.debug("Updating database...")

        to_update = {
            "chat_data": self.chat_data_json,
            "user_data": self.user_data_json,
            "bot_data": self.bot_data_json,
        }

        for key in to_update:
            self.db.upsert({key: to_update[key]}, (where(key).exists()))

    
    async def update_chat_data(self, chat_id: int, data: dict) -> None:
        await super().update_chat_data(chat_id, data)
        await self.flush()


    async def update_user_data(self, user_id: int, data: dict) -> None:
        await super().update_user_data(user_id, data)
        await self.flush()


    async def update_bot_data(self, data: dict) -> None:
        await super().update_bot_data(data)
        await self.flush()


    async def flush(self):
        self._update_database()
