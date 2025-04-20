from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request, jsonify
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://mganesh2k:nvbXzxHGZevlXp78@ai-devhacks.0oywds7.mongodb.net/?retryWrites=true&w=majority&appName=AI-DevHacks"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['customer_data']
collection = db['customer_data']

# Create (POST) - expects the specified payload
@app.route('/candidates/add', methods=['POST'])
def create_candidate():
    data = request.json
    print(data)
    # Optional: Validate required fields
    required_fields = ["_id","name"]
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    result = collection.insert_one(data)
    return jsonify({'id': str(result.inserted_id)}), 201

# Read all candidates
@app.route('/candidates', methods=['GET'])
def get_candidates():
    candidates = []
    for cand in collection.find():
        cand['_id'] = str(cand['_id'])
        candidates.append(cand)
    return jsonify(candidates)

# Read one candidate
@app.route('/candidates/<id>', methods=['GET'])
def get_candidate(id):
    cand = collection.find_one({'_id': id})
    if cand:
        cand['_id'] = str(cand['_id'])
        return jsonify(cand)
    else:
        return jsonify({'error': 'Candidate not found'}), 404

# Update candidate
@app.route('/candidates/<id>', methods=['PUT'])
def update_candidate(id):
    try:
        data = request.json
        result = collection.update_one({'_id': id}, {'$set': data})
        if result.matched_count:
            return jsonify({'message': 'Candidate updated'})
        else:
            return jsonify({'error': 'Candidate not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Delete candidate
@app.route('/candidates/<id>', methods=['DELETE'])
def delete_candidate(id):
    result = collection.delete_one({'_id': id})
    if result.deleted_count:
        return jsonify({'message': 'Candidate deleted'})
    else:
        return jsonify({'error': 'Candidate not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)