from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient,errors
from dotenv import load_dotenv
import os
import logging

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
def connect_to_mongo():
    try:
        uri = os.getenv('MONGO_URI')
        client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        database = client["todo-db"]
        if "todos" not in database.list_collection_names():
            database.create_collection('todos')
            logger.info("Collection 'todos' created.")
        return database.get_collection('todos')
    except errors.PyMongoError as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        return None
todos = connect_to_mongo()

def create_response(status:int ,message: str = "", data=None):
    return jsonify(data),status
    
def check_database():
    if not todos:
        return jsonify({"error": "Database connection failed"}), 500
        
@app.route('/', methods=['GET'])
def index():
    if todos is None:
       return create_response(500,"Database connection failed!") 
    try:
        todo_list = [
            {**todo,"_id": str(todo['_id'])} 
            for todo in todos.find()
        ]
        return create_response(200, "Todos retrieved successfully", todo_list)
    except Exception as e:
        return jsonify({"error":str(e)}),500

@app.route('/todos/create', methods=['POST'])
def create_todo():
    # if todos in None:
    #     return jsonify({"error": "Database connection failed"}), 500
    data = request.json
    required_fields = {"checked":bool,"task":str}
    for field,expected_type in required_fields.items():
        if field not in data:
            return create_response(400,f"Missing required Field: '{field}'")
        if not isinstance(data[field],expected_type):
            return create_response(400,f"Field '{field}'must be of type '{expected_type.__name__}'")
    try: 
        created_todo = todos.insert_one(data)
        inserted_id = created_todo.inserted_id
        inserted_todo = todos.find_one({"_id":inserted_id})
        inserted_todo['_id'] = str(inserted_todo['_id'])
        logger.info(create_todo)
        return create_response(201,"Todo created",inserted_todo)
    except Exception as e:
        return create_response(500,"Failed to create Todo",{"error":str(e)})



if __name__ == "__main__":
    port = os.getenv('PORT', 5000)
    app.run(debug=True,host='0.0.0.0', port=int(port))
