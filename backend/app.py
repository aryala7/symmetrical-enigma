from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)

CORS(app)
# Your routes here...

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)
    
@app.route('todos/create',methods=['POST'])    
@app.route('todos',methods=['GET'])


@app.route('todos/<id>',methods=['PUT'])
def updateTask(id):
    return '',204

@app.route('todos/<id>', methods=['DELETE'])
def deleteTask(id):
    return '',204