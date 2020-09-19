import json
from dynamodb_json import json_util as dynamo_json

def generate_expression_attribute_names(data):
    return_object = {}
    for key in data:
        if key != 'id':
            return_object['#' + key] = key
    return return_object

def get_expression_attribute_values(data):
    converted_data = {}
    for key in data:
        if key != 'id':
            converted_data[':' + key] = data[key]
    return json.loads(dynamo_json.dumps(converted_data))

def generate_update_expression(data):
    update_expression = 'SET '
    case = []
    for key in data:
        if key != 'id':
            case.append('#' + key + ' = ' + ':' + key)
    case_string = ', '.join(case)
    return update_expression + case_string