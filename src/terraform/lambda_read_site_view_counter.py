import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('schurteb-cloud-resume-challenge-backend')

def lambda_handler(event, context):
  # Return if request path is not the root domain (e.g. on direct invoke through browsers there are requests to /favicon.ico, ..)
  path = ""

  try:
    #path = event["rawPath"]
    path = event["path"]
  except:
    #print("event does not have property \"rawPath\"")
    print("event does not have property \"path\"")
    return {
        'statusCode': 400,
        'body': "{}".format(
            #response.text
            "event does not have property \"path\""
        )
    }

  if path != "/view_count":
      return {
        'statusCode': 200,
        'body': "{}".format(
            #response.text
            "event does not request root resource (" + path + ")"
        )
    }

  response = table.get_item(
    Key={
      'ID':'1'
    }
  )

  views = response['Item']['views']

  print(views)

  return {
        'statusCode': 200,
        'body': "{}".format(
            #response.text
            views
        )
    }