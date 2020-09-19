import boto3

def get_upload_presigned_url(data, user_id):
    s3 = boto3.client('s3')
    params = {
        'Bucket' : 'isah-user-uploaded-images',
        'Key' : str(data['challengeId']) + '/' + str(user_id) + '/' + data['fileName'],
        'ContentType': data['fileType']
    }
    url = s3.generate_presigned_url(
        'put_object',
        Params=params,
        ExpiresIn=900,
        HttpMethod='PUT'
    )
    return {
        "key": params['Key'],
        'url': url
    }
