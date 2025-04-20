from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request, jsonify
from flask_cors import CORS
from bson.objectid import ObjectId
from dotenv import load_dotenv
import cohere

app = Flask(__name__)
CORS(app)

load_dotenv()
COHERE_API_KEY = 'ZMdG2s96ZPww62iO7GPOsgpEQxFax101dA0pBT45'

co = cohere.Client(COHERE_API_KEY)

uri = "mongodb+srv://mganesh2k:nvbXzxHGZevlXp78@ai-devhacks.0oywds7.mongodb.net/?retryWrites=true&w=majority&appName=AI-DevHacks"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['customer_data']
collection = db['customer_data']
collection_job = db['job_details']


@app.route('/get_recruiter', methods=['GET'])
def get_recruiter():
    recruiter = collection.find_one({"role": "Recruiter"})  # adjust field name if needed
    if recruiter:
        recruiter['_id'] = str(recruiter['_id'])
        return jsonify(recruiter)
    else:
        return jsonify({"error": "No recruiter found"}), 404

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




    # --------jobs--------------

# Create (POST) - expects the specified payload
@app.route('/add_job', methods=['POST'])
def create_job():
    data = request.json
    print(" New Job Posted:", data)
    job_description = data.get('jobDescription', '')

    cohere_response = co.chat(
            message=f'Based on the following Job Description, categorise the required experience level into one of the following: Entry Level, Internship, Associate, Mid, Senior, Director, Executive. Give only the category name as output. Job Description: {job_description}',
            model="command",
            temperature=0.3
        )
    experience_level = cohere_response.text.strip()

    data['experienceLevel'] = experience_level

    # Optional: Validate recruiterId is present
    if 'recruiterId' not in data:
        return jsonify({'error': 'Missing recruiterId'}), 400

    result = collection_job.insert_one(data)
    return jsonify({'id': str(result.inserted_id), 'experienceLevel': experience_level}), 201


# Read all candidates
@app.route('/show_jobs', methods=['GET'])
def get_all_jobs():
    candidates = []
    for cand in collection_job.find():
        cand['_id'] = str(cand['_id'])
        candidates.append(cand)
    return jsonify(candidates)

# Read one candidate
@app.route('/jobs/<id>', methods=['GET'])
def get_job(id):
    cand = collection_job.find_one({'_id': id})
    if cand:
        cand['_id'] = str(cand['_id'])
        return jsonify(cand)
    else:
        return jsonify({'error': 'Candidate not found'}), 404

# Update candidate
@app.route('/jobs/<id>', methods=['PUT'])
def update_job(id):
    data = request.json
    result = collection_job.update_one({'_id': (id)}, {'$set': data})
    if result.matched_count:
        return jsonify({'message': 'Candidate updated'})
    else:
        return jsonify({'error': 'Candidate not found'}), 404

# Delete candidate
@app.route('/jobs/<id>', methods=['DELETE'])
def delete_job(id):
    result = collection_job.delete_one({'_id': id})
    if result.deleted_count:
        return jsonify({'message': 'Candidate deleted'})
    else:
        return jsonify({'error': 'Candidate not found'}), 404
    

if __name__ == '__main__':
    app.run(debug=True)
