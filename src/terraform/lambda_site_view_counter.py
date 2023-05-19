import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('schurteb-cloud-resume-challenge-backend')

def lambda_handler(event, context):
  # Return if request path is not the root domain (e.g. on direct invoke through browsers there are requests to /favicon.ico, ..)
  path = ""

  try:
    path = event["rawPath"]
  except:
    print("event does not have property \"rawPath\"")
    return ""

  if path != "/":
      return ""

  response = table.get_item(
    Key={
      'ID':'1'
    }
  )

  views = response['Item']['views']
  views = views + 1

  print(views)

  response = table.put_item(
    Item={
      'ID':'1',
      'views': views
    }
  )

  return views