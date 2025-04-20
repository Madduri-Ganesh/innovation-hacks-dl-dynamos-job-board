import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import cohere

load_dotenv()
COHERE_API_KEY = 'ZMdG2s96ZPww62iO7GPOsgpEQxFax101dA0pBT45'

co = cohere.Client(COHERE_API_KEY)
app = Flask(__name__)

@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.json
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        response = co.chat(
            message= f'Based on the following Job Description, categorise the required experience level into one of the following: Entry Level, Internship, Associate, Mid, Senior, Director, Executive. Give only the category name as output. Job Description: {prompt}',
            model="command",  # Or another Cohere model as needed
            temperature=0.3
        )
        print(response)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
