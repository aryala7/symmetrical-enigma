from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# MongoDB-Verbindung
uri = "mongodb://mongodb:27017/todo-db"
client = MongoClient(uri)

try:
    database = client["todo-db"]
    if "todos" not in database.list_collection_names():
        todos = database.create_collection('todos')
        print("Collection 'todos' created.")
    else:
        todos = database.get_collection('todos')
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    todos = None


@app.route('/', methods=['GET'])
def index():
    if todos is None:
        return jsonify({"error":"Database connection failed!"}),500
    try:
        todo_list = []
        for todo in todos.find():
            todo['_id'] = str(todo['_id'])
            todo_list.append(todo)
        return jsonify(todo_list)
    except Exception as e:
        return jsonify({"error":str(e)}),500

@app.route('/todos/create', methods=['POST'])
def create_todo():
    if not todos:
        return jsonify({"error": "Database connection failed"}), 500
    
    data = request.json
    todos.insert_one(data)
    return jsonify({"message": "Todo created"}), 201


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
