import os.path
import inspect
from loguru import logger
from config import Config
from .decorator import SingletonDecorator


@SingletonDecorator
class Log(object):
    business = None

    def __init__(self, name='pity'):  # Logger标识默认为app
        """
        :param name: 业务名称
        """
        if not os.path.exists(Config.LOG_DIR):
            os.mkdir(Config.LOG_DIR)
        self.business = name

    def info(self, message: str):
        file_name, line, func, _, _ = inspect.getframeinfo(inspect.currentframe().f_back)
        logger.bind(name=Config.PITY_INFO, func=func, line=line,
                    business=self.business, filename=file_name).debug(message)

    def error(self, message: str):
        file_name, line, func, _, _ = inspect.getframeinfo(inspect.currentframe().f_back)
        logger.bind(name=Config.PITY_ERROR, func=func, line=line,
                    business=self.business, filename=file_name).info(message)

    def warning(self, message: str):
        file_name, line, func, _, _ = inspect.getframeinfo(inspect.currentframe().f_back)
        logger.bind(name=Config.PITY_ERROR, func=func, line=line,
                    business=self.business, filename=file_name).warning(message)

    def debug(self, message: str):
        file_name, line, func, _, _ = inspect.getframeinfo(inspect.currentframe().f_back)
        logger.bind(name=Config.PITY_INFO, func=func, line=line,
                    business=self.business, filename=file_name).debug(message)

    def exception(self, message: str):
        file_name, line, func, _, _ = inspect.getframeinfo(inspect.currentframe().f_back)
        logger.bind(name=Config.PITY_ERROR, func=func, line=line,
                    business=self.business, filename=file_name).exception(message)
