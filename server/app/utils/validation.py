def validate_username(username):
    if not (5 <= len(username) <= 20):
        return False, "Username must be between 5 and 20 characters"
    return True, None

def validate_password(password):
    if not (8 <= len(password) <= 30):
        return False, "Password must be between 8 and 30 characters"
    return True, None

def validate_email(email):
    import re
    email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if not re.match(email_regex, email):
        return False, "Invalid email address"
    return True, None