import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
file_name = "data.json"

CORS(app)

@app.route("/api/data", methods=["GET"])
def get_data(): 
    with open(f"./{file_name}", "r", encoding="utf-8") as file:
        data = json.load(file)
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5173, debug=True)
