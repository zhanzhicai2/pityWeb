import json
import os
from typing import List, ClassVar
# from pydantic.v1 import BaseSettings
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT = os.path.dirname(os.path.abspath(__file__))


class BaseConfig(BaseSettings):
    LOG_DIR:str = os.path.join(ROOT, 'logs')
    LOG_NAME:str = os.path.join(LOG_DIR, 'pity.log')

    # 2. 使用SettingsConfigDict替代旧的Config类
    model_config = SettingsConfigDict(
        env_file_encoding='utf-8',  # 显式指定编码
        extra='ignore',  # 忽略额外字段
        case_sensitive=True  # 保持大小写敏感
    )

    SERVER_HOST: str = "0.0.0.0"
    #  SERVER_PORT=7777
    SERVER_PORT: int = 7777

    HEARTBEAT: int = 48
    # mock server
    # MOCK_ON = False
    # MOCK_PORT = 7779
    MOCK_ON: bool = False
    # MOCK_PORT: int
    PROXY_ON: bool = False
    PROXY_PORT: int = 7778
    # 这行代码的作用是找到当前执行脚本所在的目录的绝对路径，并将这个路径赋值给变量 ROOT。这个变量通常用作后续文件路径操作的基准点
    # print(ROOT)
    # print(os.path.abspath(__file__))

    # os.path.join(ROOT, 'logs', 'pity.log') 将 ROOT 变量（即脚本所在的目录的绝对路径）、字符串 'logs' 和字符串 'pity.log' 合并成一个完整的文件路径。这个路径指向
    # ROOT 目录下的一个名为 logs 的子目录，而 pity.log 文件则位于这个 logs 目录下
    # print(LOG_NAME)

    # Flask jsonify编码问题
    # JSON_AS_ASCII = False

    #  mysql连接信息
    # MYSQL_HOST = "127.0.0.1"
    # MYSQL_PORT = "3306"
    # MYSQL_USER = "root"
    # MYSQL_PWD = "root"
    # DBNAME = "pity"
    MYSQL_HOST: str
    MYSQL_PORT: int
    MYSQL_USER: str
    MYSQL_PWD: str
    DBNAME: str

    # Redis连接信息  密码123456
    # REDIS_HOST = "127.0.0.1"
    # REDIS_PORT = 6379
    # REDIS_DB = 0
    # REDIS_PASSWORD = ""
    # WARNING: close redis can make job run multiple times at the same time
    REDIS_ON: bool = False
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_DB: int
    REDIS_PASSWORD: str

    # REDIS_NODES =
    # [{"host": REDIS_HOST, "port": REDIS_PORT, "db": REDIS_DB, "password": REDIS_PASSWORD}]

    REDIS_NODES: List[dict] = []
    # sqlalchemy for apscheduler
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@{}:{}/{}'.format(
    #     MYSQL_USER, MYSQL_PWD, MYSQL_HOST, MYSQL_PORT, DBNAME)
    # 异步URI aiomysql
    # ASYNC_SQLALCHEMY_URI = f'mysql+aiomysql://{MYSQL_USER}:{MYSQL_PWD}@{MYSQL_HOST}:{MYSQL_PORT}/{DBNAME}'
    SQLALCHEMY_DATABASE_URI: str = ''
    # 异步URI aiomysql
    ASYNC_SQLALCHEMY_URI: str = ''
    # pg数据库 apscheduler配置参考 需要安装psycopg2
    # SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://postgres:woody@127.0.0.1:5433/pity'

    # pg数据库 异步配置参考 需要安装asyncpg
    # ASYNC_SQLALCHEMY_URI = f'postgresql+asyncpg://postgres:woody@127.0.0.1:5433/pity'

    SQLALCHEMY_TRACK_MODIFICATIONS:bool = False

    # 权限 0 普通用户 1 组长 2 管理员
    MEMBER: ClassVar[int] = 0
    MANAGER: ClassVar[int] = 1
    ADMIN: ClassVar[int] = 2

    # github access_token地址
    GITHUB_ACCESS: ClassVar[str] = "https://github.com/login/oauth/access_token"

    # github获取用户信息
    GITHUB_USER: ClassVar[str] = "https://api.github.com/user"

    # client_id
    CLIENT_ID: str
    #  CLIENT_ID = "Ov23liVwVosaCVRmkjg2"
    # CLIENT_ID = "c46c7ae33442d13498cd"

    # SECRET
    SECRET_KEY: str
    #  SECRET_KEY = "490e04ca7426209c0b43b4ae4884a70e01c7c785"
    # SECRET_KEY = "c79fafe58ff45f6b5b51ddde70d2d645209e38b9"

    # 测试报告路径
    REPORT_PATH: ClassVar[str] = os.path.join(ROOT, "templates", "report.html")

    # 重置密码路径
    PASSWORD_HTML_PATH: ClassVar[str] = os.path.join(ROOT, "templates", "reset_password.html")

    # APP 路径
    APP_PATH: ClassVar[str] = os.path.join(ROOT, "app")

    # dao路径
    DAO_PATH: ClassVar[str] = os.path.join(APP_PATH, 'crud')

    # markdown地址
    MARKDOWN_PATH: ClassVar[str] = os.path.join(ROOT, 'templates', "markdown")

    # SERVER_REPORT = "http://test.pity.fun/record/report/"
    SERVER_REPORT: str = "http://127.0.0.1/record/report/"
    SERVER_HOST = "127.0.0.1"

    #   ALIYUN = "aliyun" 被enums取代
    #  七牛
    # QINIU = "qiniu"
    OSS_URL: ClassVar[str] = "http://sxlou3qby.hn-bkt.clouddn.com"

    # 七牛云链接地址，如果采用七牛oss，需要自行替换
    # QINIU_URL = "https://static.pity.fun"

    RELATION: ClassVar[str] = "pity_relation"
    ALIAS: ClassVar[str] = "__alias__"
    TABLE_TAG: ClassVar[str] = "__tag__"
    # 数据库表展示的变更字段
    FIELD: ClassVar[str] = "__fields__"
    SHOW_FIELD: ClassVar[str] = "__show__"
    IGNORE_FIELDS: ClassVar[str] = ('created_at', "updated_at", "deleted_at", "create_user", "update_user")

    # 测试计划中，case默认重试次数
    RETRY_TIMES:ClassVar[int] = 1

    # 日志名
    PITY_ERROR: ClassVar[str] = "pity_error"
    PITY_INFO: ClassVar[str] = "pity_info"

class DevConfig(BaseConfig):
    # 3. 使用model_config替代Config内部类
    # class Config:
    #     # env_file = "./conf/dev.env"
    #     env_file = os.path.join(ROOT, "conf", "dev.env")
    model_config = SettingsConfigDict(
        env_file=os.path.join(ROOT, "conf", "dev.env"),
        env_file_encoding='utf-8'
    )

class ProConfig(BaseConfig):
    # # mysql连接信息
    # MYSQL_HOST = "127.0.0.1"
    # MYSQL_PORT = "3306"
    # MYSQL_USER = "root"
    # MYSQL_PWD = "root"
    # DBNAME = "pity"

    # # Redis连接信息  密码123456
    # REDIS_HOST = "127.0.0.1"
    # REDIS_PORT = 6379
    # REDIS_DB = 0
    # REDIS_PASSWORD = ""
    #
    # # Redis连接信息
    # REDIS_NODES = [{"host": REDIS_HOST, "port": REDIS_PORT, "db": REDIS_DB, "password": REDIS_PASSWORD}]
    #
    # # sqlalchemy
    # SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://{}:{}@{}:{}/{}'.format(
    #     MYSQL_USER, MYSQL_PWD, MYSQL_HOST, MYSQL_PORT, DBNAME)
    # # 异步URI aiomysql
    # ASYNC_SQLALCHEMY_URI = f'mysql+aiomysql://{MYSQL_USER}:{MYSQL_PWD}@{MYSQL_HOST}:{MYSQL_PORT}/{DBNAME}'
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    #
    # CLIENT_ID = "Ov23liVwVosaCVRmkjg2"
    # SECRET_KEY = "490e04ca7426209c0b43b4ae4884a70e01c7c785"


    # 3. 使用model_config替代Config内部类
    model_config = SettingsConfigDict(
        env_file=os.path.join(ROOT, "conf", "pro.env"),
        env_file_encoding='utf-8'
    )
    # class Config:
    #     # env_file = "./conf/pro.env"
    #     env_file = os.path.join(ROOT, "conf", "pro.env")

    # 4. 覆盖父类属性直接在类中定义
    SERVER_REPORT: str = "http://127.0.0.1/#/record/report/"

# 获取pity环境变量
PITY_ENV = os.environ.get("pity_env", "dev")
# 如果pity_env存在且为prod
Config = ProConfig() if PITY_ENV and PITY_ENV.lower() == "pro" else DevConfig()
# Config = ProConfig() if PITY_ENV and PITY_ENV.lower() == "pro" else DevConfig()
# init redis
Config.REDIS_NODES = [
    {
        "host": Config.REDIS_HOST,
        "port": Config.REDIS_PORT,
        "db": Config.REDIS_DB,
        "password": Config.REDIS_PASSWORD
    }
]

# init sqlalchemy (used by apscheduler)
Config.SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://{}:{}@{}:{}/{}'.format(
    Config.MYSQL_USER, Config.MYSQL_PWD, Config.MYSQL_HOST, Config.MYSQL_PORT, Config.DBNAME)

# init async sqlalchemy
Config.ASYNC_SQLALCHEMY_URI = f'mysql+aiomysql://{Config.MYSQL_USER}:{Config.MYSQL_PWD}' \
                              f'@{Config.MYSQL_HOST}:{Config.MYSQL_PORT}/{Config.DBNAME}'

BANNER = """
 ________        ___          _________         ___    ___ 
|\   __  \      |\  \        |\___   ___\      |\  \  /  /|
\ \  \|\  \     \ \  \       \|___ \  \_|      \ \  \/  / /
 \ \   ____\     \ \  \           \ \  \        \ \    / / 
  \ \  \___|      \ \  \           \ \  \        \/  /  /  
   \ \__\          \ \__\           \ \__\     __/  / /    
    \|__|           \|__|            \|__|    |\___/ /     
                                              \|___|/      

"""

