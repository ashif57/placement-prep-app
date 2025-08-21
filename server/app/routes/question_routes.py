from flask import Blueprint, jsonify, request
from app.database import get_db
from bson import ObjectId

bp = Blueprint('questions', __name__, url_prefix='/api')

@bp.route('/questions', methods=['GET'])
def get_questions():
    db = get_db()
    company = request.args.get('company')
    category = request.args.get('category')
    subcategory = request.args.get('subcategory')
    limit = request.args.get('limit', type=int)

    query = {}
    if company:
        query['company'] = company
    if category:
        query['category'] = category
    if subcategory:
        query['subcategory'] = subcategory

    questions_cursor = db.questions.find(query)
    if limit:
        questions_cursor = questions_cursor.limit(limit)
    questions_list = []
    for q in questions_cursor:
        questions_list.append({
            '_id': str(q['_id']),
            'question': q.get('question'),
            'options': q.get('options'),
            'type': q.get('type'),
            'category': q.get('category'),
            'subcategory': q.get('subcategory'),
            'answer': q.get('answer') # Add the answer field
        })
    return jsonify(questions_list)