# PIL Layer
This is the AWS Lambda layer based on python3.8. This cannot be pushed liked any other python package because it is dependent on the environment. Amazon Lambda runs on Amazon Linux. So we will need to create a python package of Pillow(PIL) which runs on Amazon Linux. For this we will use docker image of Amazon Linux.

## Generate Package(Optional)
I have pushed the Amazon Linux based PIL python3.8 package for convenience. But if you still want to generate a fresh new package(maybe based on another python version) this is how I generated the package.
1. `mkdir PIL && cd PIL`
2. `export PWD=$(pwd)`
3. `docker run --rm -it -v ${PWD}:/var/task lambci/lambda:build-python3.8 bash`
4. `pip install pillow -t python/lib/python3.8/site-packages/`
5. `exit`


## Deploy
### Prerequisite
- Make sure you have [Serverless](https://www.npmjs.com/package/serverless) installed.
- AWS Credentials Setup using [AWS CLI](https://pypi.org/project/awscli/)
### Deployment
```zsh
sls deploy
```
