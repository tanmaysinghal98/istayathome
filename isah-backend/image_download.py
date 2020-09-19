import boto3

def get_download_presigned_url(request_body, user_id):
    s3 = boto3.client('s3')
    params = {
        'Bucket' : 'isah-processed-achievement-images',
        'Key' : request_body['key'],
    }
    url = s3.generate_presigned_url(
        'get_object',
        Params=params,
        ExpiresIn=900,
        HttpMethod='GET'
    )
    return {
        'url': url
    }