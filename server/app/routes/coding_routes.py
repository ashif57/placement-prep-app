from flask import Blueprint, request, jsonify

bp = Blueprint('coding', __name__, url_prefix='/coding')

@bp.route('/problem', methods=['GET'])
def get_coding_problem():
    # Implement logic to fetch a coding problem
    problem = {
        'id': 1,
        'title': 'Reverse a String',
        'description': 'Write a function to reverse a given string.',
        'example': 'Input: "hello", Output: "olleh"'
    }
    return jsonify(problem)

@bp.route('/submit', methods=['POST'])
def submit_code():
    # Implement logic to handle code submission
    data = request.get_json()
    code = data.get('code')
    # Process the code and evaluate it
    return jsonify({'message': 'Code submitted successfully!'})