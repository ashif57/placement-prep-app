class CodingProblem:
    def __init__(self, title, description, example, difficulty):
        self.title = title
        self.description = description
        self.example = example
        self.difficulty = difficulty

    def __repr__(self):
        return f'<CodingProblem {self.title}>'