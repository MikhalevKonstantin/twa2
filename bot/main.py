#####
# Library imports

import os
import logging
import asyncio

from telegram import (
    Message,
    Update,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    WebAppInfo,
    MessageEntity,
    constants,
)

from telegram.ext import (
    Application,
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
    MessageHandler,
    CallbackQueryHandler,
    ConversationHandler,
    filters,
)

from tinydbpersistence import *

#####
# Global variables

END = ConversationHandler.END
WEBAPP_URL = "https://tonchi-tma.vercel.app/"

#####
# Logging configuration

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
# set higher logging level for httpx to avoid all GET and POST requests being logged
logging.getLogger("httpx").setLevel(logging.WARNING)

# END PART OF LOGGING CONFIGURATION: 
# set lower logging level for custom development logs
devlogger = logging.getLogger("developer")
devlogger.setLevel(logging.DEBUG)

logging.info("Logging configured.")

#####
# Basic utilites

async def rm(update: Update, context: ContextTypes.DEFAULT_TYPE, message: Message = None):
    # Delete reply markup from the last remembered message if exists
    try:
        await context.bot.delete_message(chat_id=update.effective_chat.id, message_id=context.user_data["LAST_REPLY_MARKUP_MSG"])
    except:
        pass

    # Remember new message if provided, otherwise delete last remembered message
    context.user_data["LAST_REPLY_MARKUP_MSG"] = message.message_id if message else None


async def end_conversation(update: Update, context: ContextTypes.DEFAULT_TYPE):
    return END


async def get_user_name(user_id: int):
    if user_id == None:
        return None

    chat = await application.bot.get_chat(chat_id=user_id)

    if chat.type != 'private': # user's ID must be a user ID that leads to a private chat with the user
        return None

    user_name = chat.effective_name if chat.username == None else f"<a href=\"https://t.me/{chat.username}\">{chat.effective_name}</a>"

    return user_name


def remove_job_if_exists(name: str, context: ContextTypes.DEFAULT_TYPE) -> bool:
    current_jobs = context.job_queue.get_jobs_by_name(name)

    if not current_jobs:
        return False

    for job in current_jobs:
        job.schedule_removal()

    return True

#####
# Debug tools

async def user_info(update: Update, context: ContextTypes.DEFAULT_TYPE):
    msg = update.effective_message
    user = update.effective_user
    chat = update.effective_chat
    
    await msg.reply_text(text=f"User ID: {user.id}\nChat ID: {chat.id}\nReplied message ID: {msg.message_id}", quote=True)

#####
# Main

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    chat = update.effective_chat

    if context.user_data.get("referrer_id") == None and len(context.args) > 0:
        await referral_check(update, context)

    await main_menu(update, context)


async def main_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    cbq = update.callback_query
    msg = update.effective_message
    chat = update.effective_chat

    buttons = [
        [InlineKeyboardButton(text="🐶 Open the game", web_app=WebAppInfo(url=WEBAPP_URL))],
        [InlineKeyboardButton(text="🚀 Join Channel", url="https://t.me/Tonchi_wallet")],
        [InlineKeyboardButton(text="👋 Invite a Friend", callback_data="referral_info")],
    ]
    keyboard = InlineKeyboardMarkup(buttons)
    text = "Welcome to the world of Tonchis!"

    if cbq:
        await cbq.answer()

        menu_msg = msg

        await menu_msg.edit_caption(caption=text, reply_markup=keyboard)
    else:
        menu_msg = await msg.reply_photo(
            photo=open("tonchi_1.png", 'rb'),
            caption=text,
            reply_markup=keyboard,
        )

        await rm(update, context, menu_msg)

    await menu_msg.pin(disable_notification=True)

###
# Follow-up

async def web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat = update.effective_chat
    msg = update.effective_message
    data = msg.web_app_data.data

    if data == "entered":
        remove_job_if_exists(str(chat.id))

        # Plan follow-up notification in 1 day (86400 seconds)
        context.job_queue.run_once(send_notification, 86400, chat_id=chat.id, name=str(chat.id))


async def send_notification(context: ContextTypes.DEFAULT_TYPE) -> None:
    job = context.job

    buttons = [
        [InlineKeyboardButton(text="🚀 Join Channel", url="https://t.me/Tonchi_wallet")],
        [InlineKeyboardButton(text="👋 Invite a Friend", callback_data="referral_info")],
    ]
    keyboard = InlineKeyboardMarkup(buttons)

    await context.bot.send_message(chat_id=job.chat_id, text="Hi, it’s Tonchi. Remember to join our channel and invite your friends! You will earn in-game coins for every invited friend!", reply_markup=keyboard)

###
# Referral system

async def referral_check(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    chat = update.effective_chat

    try:
        referrer_id = int(context.args[0])
        referrer_chat = await context.bot.get_chat(chat_id=referrer_id)
        
        if referrer_chat.type != 'private' or referrer_id == user.id: # referrer's ID must be a user ID that leads to a private chat with the referrer
            return
        
        context.user_data["referrer_id"] = referrer_id

        # Try getting a linked user's full name
        user_name = chat.full_name if user.username == None else f"<a href=\"https://t.me/{user.username}\">{chat.full_name}</a>"

        # Send notification to the referrer
        await context.bot.send_message(chat_id=referrer_id, text=f"User {user_name} has used your invitation link.", parse_mode="HTML")

        # Add referral's ID into referrer's user_data
        application.user_data[referrer_id].setdefault("referrals", []).append(user.id)
    except Exception as e:
        devlogger.debug(e)


async def show_referral_info(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    cbq = update.callback_query
    msg = cbq.message

    await cbq.answer()

    bot_username = (await context.bot.get_me()).username

    text = f"Invite friends with your referral link:\n<code>https://t.me/{bot_username}?start={user.id}</code>"

    # Retrieve information about user's referrer
    referrer = await get_user_name(context.user_data.get("referrer_id"))

    if referrer != None:
        text += f"\n\nYour referrer is {referrer}"

    # Retrieve information about user's referrals
    referrals = context.user_data.get("referrals")

    if referrals != None:
        referral_names = []
        for referral_id in referrals:
            referral = await get_user_name(referral_id)
            if referral != None:
                referral_names.append(referral)

        if len(referral_names) > 0:
            text += "\n\nReferrals:"
            for referral_name in referral_names:
                text+= f"\n{referral_name}"

    buttons = [
        [InlineKeyboardButton(text="🐶 Open the game", web_app=WebAppInfo(url=WEBAPP_URL))],
        [InlineKeyboardButton(text="Back", callback_data="menu")],
    ]
    keyboard = InlineKeyboardMarkup(buttons)
    
    await cbq.message.edit_caption(
        caption=text,
        reply_markup=keyboard,
        parse_mode='html',
    )

#####
# Bot configuration

if __name__ == '__main__':
    my_persistence = TinyDBPersistence("db.json")
    application = ApplicationBuilder().token(os.environ["TG_API_TOKEN"]).persistence(my_persistence).build()

    ###
    # Handlers

    handlers = [
        CallbackQueryHandler(main_menu, pattern=r"^menu$"),
        CallbackQueryHandler(show_referral_info, pattern=r"^referral_info$"),
        CommandHandler('start', start),
        CommandHandler('userinfo', user_info),
        MessageHandler(filters.StatusUpdate.WEB_APP_DATA, web_app_data)
    ]

    application.add_handlers(handlers)

    ###

    application.run_polling(timeout=500)

