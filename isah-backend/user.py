import uuid
import json
import datetime
import boto3
from dynamodb_json import json_util as dynamo_json
import utils

def create_user():
    client = boto3.client('dynamodb')
    data = {
        'id': str(uuid.uuid4()),
        'createDate': int(datetime.datetime.now().timestamp()),
        'name': None,
        'email': None,
        'phoneNumber': None,
        'challengesCompleted': []
    }
    client.put_item(TableName='users', Item=json.loads(dynamo_json.dumps(data)))
    return data

def get_user(user_id):
    client = boto3.client('dynamodb')
    response = client.get_item(TableName='users', Key=json.loads(dynamo_json.dumps({'id': user_id})))
    return dynamo_json.loads(response['Item'])

def update_users(data):
    client = boto3.client('dynamodb')
    response = client.update_item(
        TableName='users',
        Key=json.loads(dynamo_json.dumps({'id': data['id']})),
        ExpressionAttributeValues=utils.get_expression_attribute_values(data),
        UpdateExpression=utils.generate_update_expression(data),
        ExpressionAttributeNames=utils.generate_expression_attribute_names(data),
        ReturnValues='ALL_NEW'
    )
    return dynamo_json.loads(response['Attributes'])

def mark_challenge_complete(challenge, data, user_id):
    user = get_user(user_id)
    user['challengesCompleted'].append({
        'challengeId': challenge['id'],
        'achievementImageKey': data['uploadedFileKey'],
        'completedOn': int(datetime.datetime.now().timestamp())
    })
    client = boto3.client('dynamodb')
    response = client.update_item(
        TableName='users',
        Key=json.loads(dynamo_json.dumps({'id': user_id})),
        ExpressionAttributeValues=utils.get_expression_attribute_values(user),
        UpdateExpression=utils.generate_update_expression(user),
        ExpressionAttributeNames=utils.generate_expression_attribute_names(user),
        ReturnValues='ALL_NEW'
    )
    return dynamo_json.loads(response['Attributes'])