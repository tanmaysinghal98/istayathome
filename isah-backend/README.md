# IStayAtHome Backend
This is the complete backend code serverless code for istayathome. Demo [istayathome.in](https://istayathome.in])

## Getting Started

### Prerequisite
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Python 3.8](https://www.python.org/downloads/release/python-380/)
- [Serverless Framework](https://www.npmjs.com/package/serverless)
- AWS Credentials setup using [AWS CLI](https://pypi.org/project/awscli/)

### Installation
- Install Serverless Python Requirements
```zsh
sls plugin install -n serverless-python-requirements
```
- Install pip packages in a python virtualenv.
```zsh
pip install -r requirements.txt
```

## Usage
Deploy the backend using below command and take a note of the APIs created. We may need to add these API's in frontend code.
```
sls deploy
```
