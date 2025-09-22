from loguru import logger
import sys

def setup_logging():
    logger.remove()
    logger.add(sys.stdout, format="{time} | {level} | {message}", level="DEBUG")
    logger.add("logs/app.log", rotation="10 MB", retention="7 days", level="DEBUG")
