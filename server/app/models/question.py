class Question:
    def __init__(self, text, options, answer):
        self.text = text
        self.options = options
        self.answer = answer

    def __repr__(self):
        return f'<Question {self.text}>'