import json
import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data.json")

CORS(app)


@app.route("/api/data", methods=["GET"])
def get_data():
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as file:
            data = json.load(file)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "data.json not found", "path": DATA_PATH}), 404
    except json.JSONDecodeError as e:
        return jsonify({"error": "Invalid JSON in data.json", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
