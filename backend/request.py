import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import pandas as pd
import numpy as np
import json

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


df = pd.read_csv('./Assets/diseases_cleaned.csv')

@app.route('/retrieve', methods=['POST'])
def filter_data():
    # Get user input coordinates
    try:
        # Get user input coordinates from the JSON request
        requestData = request.json
        latitude = requestData[0]
        longitude = requestData[1]
        
        print("Request Data: ", requestData)
        
        # Define boundaries for latitude and longitude
        lat_lower_bound = latitude - 0.2
        lat_upper_bound = latitude + 0.2
        lon_lower_bound = longitude - 0.2
        lon_upper_bound = longitude + 0.2

        # Filter DataFrame based on latitude and longitude ranges
        filtered_df = df[
            (df['latitude'] >= lat_lower_bound) & (df['latitude'] <= lat_upper_bound) &
            (df['longitude'] >= lon_lower_bound) & (df['longitude'] <= lon_upper_bound)
        ]

        # Convert filtered DataFrame to JSON
        filtered_data_json = filtered_df.to_json(orient='records')

        return jsonify(filtered_data_json)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)