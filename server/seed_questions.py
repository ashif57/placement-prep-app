import json
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["questionsdb"]
collection = db["questions"]

with open(os.path.join(os.path.dirname(__file__), "wipro_set_2.json"), "r", encoding="utf-8") as f:
    data = json.load(f)
    collection.insert_many(data)

print("✅ Wipro Quantitative questions inserted.")
