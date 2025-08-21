from flask import Blueprint, request, jsonify

bp = Blueprint('essay', __name__, url_prefix='/essay')

@bp.route('/question', methods=['GET'])
def get_essay_question():
    # Implement logic to fetch an essay question
    question = "Describe your approach to solving complex problems."
    return jsonify({'question': question})

@bp.route('/submit', methods=['POST'])
def submit_essay():
    # Implement logic to handle essay submission
    data = request.get_json()
    essay_text = data.get('essay')
    # Process the essay text and store it
    return jsonify({'message': 'Essay submitted successfully!'})