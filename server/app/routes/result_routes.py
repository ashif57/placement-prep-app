from flask import Blueprint, jsonify, request
from app.database import get_db
from bson import ObjectId
from datetime import datetime

bp = Blueprint('results', __name__, url_prefix='/api')

@bp.route('/results', methods=['POST'])
def save_result():
    db = get_db()
    data = request.get_json()
    print(f"[{datetime.utcnow()}] Received data for /api/results POST: {data}")
    
    category = data.get('category')
    score = data.get('score')
    total_questions = data.get('totalQuestions')
    detailed_results = data.get('detailedResults', [])
    
    if not all([category, score is not None, total_questions is not None]):
        return jsonify({"error": "Missing data for result"}), 400

    result_entry = {
        "category": category,
        "score": score,
        "totalQuestions": total_questions,
        "detailedResults": detailed_results,
        "timestamp": datetime.utcnow()
    }
    
    db.results.insert_one(result_entry)
    return jsonify({"message": "Result saved successfully"}), 201

@bp.route('/results', methods=['GET'])
def get_results_history():
    db = get_db()
    results_cursor = db.results.find().sort("timestamp", -1) # Sort by most recent
    
    results_list = []
    for result in results_cursor:
        result['_id'] = str(result['_id']) # Convert ObjectId to string
        results_list.append(result)
        
    return jsonify(results_list), 200

@bp.route('/results/<id>', methods=['GET'])
def get_result_by_id(id):
    db = get_db()
    try:
        result = db.results.find_one({"_id": ObjectId(id)})
        if result:
            result['_id'] = str(result['_id'])
            # Ensure detailedResults is included, default to empty list if not present
            result['detailedResults'] = result.get('detailedResults', [])
            return jsonify(result), 200
        else:
            return jsonify({"error": "Result not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/results/<id>', methods=['DELETE'])
def delete_result(id):
    db = get_db()
    try:
        result = db.results.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Result deleted successfully"}), 200
        else:
            return jsonify({"error": "Result not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/questions/by-ids', methods=['POST'])
def get_questions_by_ids():
    db = get_db()
    data = request.get_json()
    question_ids = data.get('ids', [])
    
    # Convert string IDs to ObjectId
    object_ids = [ObjectId(q_id) for q_id in question_ids]
    
    # Fetch questions from the 'questions' collection
    questions = list(db.questions.find({"_id": {"$in": object_ids}}))
    
    # Convert ObjectId to string for JSON serialization
    for question in questions:
        question['_id'] = str(question['_id'])
        
    return jsonify(questions), 200