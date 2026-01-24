from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import datetime
import re

app = Flask(__name__)
CORS(app)

DB_FILE = "sidebar.db"

# ---------- DATABASE SETUP ----------
def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS chats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT,
            corrected_question TEXT,
            timestamp TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# ---------- UTILITY (CORRECT BAD QUESTIONS) ----------
def correct_question(text):
    text = text.strip()
    # Fix double spaces
    text = re.sub(r"\s+", " ", text)
    # Capitalize first letter
    if text:
        text = text[0].upper() + text[1:]
    # Ensure it ends with '?'
    if text and not text.endswith("?"):
        text += "?"
    return text

# ---------- API: SAVE QUESTION ----------
@app.route("/save_chat", methods=["POST"])
def save_chat():
    data = request.get_json()
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"error": "Empty question"}), 400

    corrected = correct_question(question)
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("""
            INSERT INTO chats (question, corrected_question, timestamp)
            VALUES (?, ?, ?)
        """, (question, corrected, timestamp))
        conn.commit()
        conn.close()
        print(f"[INFO] Saved chat: {corrected} at {timestamp}")
        return jsonify({"message": "Saved", "corrected": corrected})
    except Exception as e:
        print(f"[ERROR] Saving chat failed: {e}")
        return jsonify({"error": "Failed to save chat"}), 500

# ---------- API: GET RECENT CHATS ----------
@app.route("/recent_chats", methods=["GET"])
def recent_chats():
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("""
            SELECT corrected_question, timestamp
            FROM chats
            ORDER BY id DESC
            LIMIT 10
        """)
        rows = c.fetchall()
        conn.close()
        chats = [{"text": r[0], "time": r[1]} for r in rows]
        return jsonify(chats)
    except Exception as e:
        print(f"[ERROR] Fetching recent chats failed: {e}")
        return jsonify({"error": "Failed to fetch chats"}), 500

# ---------- API: CLEAR ALL CHATS (FOR TESTING) ----------
@app.route("/clear_chats", methods=["POST"])
def clear_chats():
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("DELETE FROM chats")
        conn.commit()
        conn.close()
        print("[INFO] Cleared all chats")
        return jsonify({"message": "All chats cleared"})
    except Exception as e:
        print(f"[ERROR] Clearing chats failed: {e}")
        return jsonify({"error": "Failed to clear chats"}), 500

# ---------- RUN ----------
if __name__ == "__main__":
    print("Starting Sidebar backend on http://localhost:6000")
    app.run(port=6000, debug=True)
