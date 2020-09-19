def get_cookie_value(headers):
    if 'Authorization' in headers:
        user_id = headers['Authorization']
        print(user_id)
        if user_id != 'NO AUTH':
            return user_id
    return None
