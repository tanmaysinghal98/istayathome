from PIL import Image, ImageOps
from io import BytesIO
import boto3

def get_image_from_s3(bucket, key):
    s3 = boto3.client('s3')
    file_byte_string = s3.get_object(Bucket=bucket, Key=key)['Body'].read()
    return Image.open(BytesIO(file_byte_string))

def save_image_on_s3(image, key):
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")
    buffer = BytesIO()
    image.save(buffer, 'JPEG', optimize=True, quality=85)
    buffer.seek(0)
    s3 = boto3.client('s3')
    s3.put_object(Bucket='isah-processed-achievement-images', Key=key, Body=buffer)

def crop_image(image, x, y):
    width, height = image.size
    new_height = (width / x) * y
    if new_height <= height:
        top = int((height - new_height) / 2)
        bottom = int((height - new_height) / 2) + new_height
        image = image.crop((0, top, width, bottom))
    else:
        new_width = (height / y) * x
        left = int((width - new_width) / 2)
        right = int((width - new_width) / 2) + new_width
        image = image.crop((left, 0, right, height))
    return image

def crop_circle(image):
    mask = Image.open('masks/circle.png').convert('L')
    output = ImageOps.fit(image, mask.size, centering=(0.5, 0.5))
    output.putalpha(mask)
    return output

def run(challenge, data):
    achievement_image = get_image_from_s3('isah-raw-achievement-images', str(challenge['id']) + '/' + challenge['achievementImage']['key'])
    user_image = get_image_from_s3('isah-user-uploaded-images', data['uploadedFileKey'])
    if 'ratio' in challenge['achievementImage']:
        if challenge['achievementImage']['ratio'] == 'circle':
            user_image = crop_circle(user_image)
        else:
            x = int(challenge['achievementImage']['ratio'].split(':')[0])
            y = int(challenge['achievementImage']['ratio'].split(':')[1])
            user_image = crop_image(user_image, x, y)
    user_image = user_image.convert('RGBA')
    if 'rotate' in challenge['achievementImage']:
        user_image = user_image.rotate(challenge['achievementImage']['rotate'], expand=True)
    if 'resize' in challenge['achievementImage']:
        x = int(challenge['achievementImage']['resize'].split('x')[0])
        y = int(challenge['achievementImage']['resize'].split('x')[1])
        user_image = user_image.resize((x, y), Image.ANTIALIAS)
    if 'paste' in challenge['achievementImage']:
        x = int(challenge['achievementImage']['paste'].split(', ')[0])
        y = int(challenge['achievementImage']['paste'].split(', ')[1]) 
        achievement_image.paste(user_image, (x, y), user_image)
    save_image_on_s3(achievement_image, data['uploadedFileKey'])
    