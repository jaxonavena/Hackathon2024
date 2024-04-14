import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
openai.api_key = "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"

def chat_with_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content.strip()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data["message"]
    response = chat_with_gpt(user_input)
    return jsonify({"message": response})

if __name__ == "__main__":
    app.run(debug=True)