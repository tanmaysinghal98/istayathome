import uuid
import json
import datetime
import boto3
from dynamodb_json import json_util as dynamo_json
import utils

def create_challenge(data):
    client = boto3.client('dynamodb')
    if 'id' not in data:
        data['id'] = id(int(datetime.datetime.now().timestamp()))
    if 'createDate' not in data:
        data['createDate'] = int(datetime.datetime.now().timestamp())
    client.put_item(TableName='challenges', Item=json.loads(dynamo_json.dumps(data)))
    return data

def get_challenge_by_id(challenge_id):
    client = boto3.client('dynamodb')
    response = client.get_item(TableName='challenges', Key=json.loads(dynamo_json.dumps({'id': int(challenge_id)})))
    return dynamo_json.loads(response['Item'])

def get_challenges():
    client = boto3.client('dynamodb')
    response = client.scan(TableName='challenges')
    return dynamo_json.loads(response['Items'])

def update_challenges(data):
    client = boto3.client('dynamodb')
    response = client.update_item(
        TableName='challenges',
        Key=json.loads(dynamo_json.dumps({'id': data['id']})),
        ExpressionAttributeValues=utils.get_expression_attribute_values(data),
        UpdateExpression=utils.generate_update_expression(data),
        ExpressionAttributeNames=utils.generate_expression_attribute_names(data),
        ReturnValues='ALL_NEW'
    )
    return dynamo_json.loads(response['Attributes'])