import json
import auth
import user
import challenge
import image_upload
import image_process
import image_download


def get_users(event, context):
    print(event)
    user_id = auth.get_cookie_value(event['headers'])
    if user_id is None:
        body = user.create_user()
    else:
        body = user.get_user(user_id)
    response = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response

def update_users(event, context):
    print(event)
    user_id = auth.get_cookie_value(event['headers'])
    request_body = json.loads(event['body'])
    if 'id' not in request_body or request_body['id'] != user_id:
        body = {
            "message": "User not found"
        }
        response = {
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
            "statusCode": 400,
            "body": json.dumps(body)
        }
        return response
    body = user.update_users(request_body)
    response = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response

def get_upload_presigned_url(event, context):
    user_id = auth.get_cookie_value(event['headers'])
    request_body = json.loads(event['body'])
    if user_id is not None:
        body = image_upload.get_upload_presigned_url(request_body, user_id)
    else:
        body = {'message': 'User Not Authenticated'}
    response = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response

def get_download_presigned_url(event, context):
    user_id = auth.get_cookie_value(event['headers'])
    request_body = json.loads(event['body'])
    if user_id is not None:
        body = image_download.get_download_presigned_url(request_body, user_id)
    else:
        body = {'message': 'User Not Authenticated'}
    response = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response

def process_image(event, context):
    print(event)
    user_id = auth.get_cookie_value(event['headers'])
    request_body = json.loads(event['body'])
    if user_id is not None:
        chal = challenge.get_challenge_by_id(request_body['challengeId'])
        image_process.run(chal, request_body)
        body = user.mark_challenge_complete(chal, request_body, user_id)
    else:
        body = {'message': 'User Not Authenticated'}
    response = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response

def get_challenges(event, context):
    print(event)
    if event['queryStringParameters'] is not None:
        id = event['queryStringParameters']['id']
        body = challenge.get_challenge_by_id(id)
    else:
        body = challenge.get_challenges()
    response = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response

def create_challenge(event, context):
    print(event)
    request_body = json.loads(event['body'])
    body = challenge.create_challenge(request_body)
    response = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

# def update_challenges(event, context):
#     print(event)
#     user_id = auth.get_cookie_value(event['headers'])
#     request_body = json.loads(event['body'])
#     if 'id' not in request_body or request_body['id'] != user_id:
#         body = {
#             "message": "User not found"
#         }
#         response = {
#             'headers': {
#                 'Access-Control-Allow-Origin': '*',
#                 'Access-Control-Allow-Credentials': True,
#             },
#             "statusCode": 400,
#             "body": json.dumps(body)
#         }
#         return response

#     body = user.update_users(request_body)
#     response = {
#         'headers': {
#             'Access-Control-Allow-Origin': '*',
#             'Access-Control-Allow-Credentials': True,
#         },
#         "statusCode": 200,
#         "body": json.dumps(body)
#     }

#     return response
