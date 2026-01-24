
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os
import json
import re

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def sentence_streamer(stream):
    buffer = ""
    for chunk in stream:
        if not chunk.choices or not chunk.choices[0].delta or not chunk.choices[0].delta.content:
            continue
            
        content = chunk.choices[0].delta.content
        buffer += content

        # Simple sentence splitting - send data as it comes
        if content.strip() and len(buffer) > 0:
            yield f"data: {json.dumps({'text': buffer})}\n\n"
            buffer = ""
    
    # Signal completion
    yield "data: [DONE]\n\n"

@app.route('/ask', methods=['POST', 'OPTIONS'])
def ask():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        question = data.get("question", "")
        history = data.get("history", [])

        if not question:
            return jsonify({"error": "No question provided"}), 400

        print(f"Received question: {question}")
        print(f"History length: {len(history)}")

        # Build conversation context
        messages = []
        for msg in history[-6:]:  # Reduced context window
            messages.append({"role": msg["role"], "content": msg["content"]})
        
        messages.append({"role": "user", "content": question})

        print("Sending request to Groq API...")
        
        stream = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            stream=True,
            temperature=0.7,
            max_tokens=1024
        )

        return Response(sentence_streamer(stream), 
                       mimetype="text/event-stream",
                       headers={
                           'Cache-Control': 'no-cache',
                           'Connection': 'keep-alive',
                           'Access-Control-Allow-Origin': '*',
                           'Access-Control-Allow-Headers': 'Content-Type',
                       })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "message": "Server is running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')