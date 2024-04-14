from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS
import csv

def retrieve_data_from_csv(csv_file, key):
    with open(csv_file, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            if key[0] == '0':
                slicedKey = key[1:]
                if slicedKey == row['LocationName']:
                    return row
            else:
                if row['LocationName'] == key:
                    return row
                
app = Flask(__name__)
CORS(app)

@app.route("/retrieve", methods=['POST'])
def retrieve_data():
    request_data = request.json.get('requestData')
    response_data = retrieve_data_from_csv("Assets/DiseaseData.csv", request_data)
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True)