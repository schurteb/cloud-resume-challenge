# SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
#
# SPDX-License-Identifier: MIT

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
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
        },
        'body': "{}".format(
            #response.text
            "event does not have property \"path\""
        )
    }

  if path != "/view_count":
      return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
        },
        'body': "{}".format(
            #response.text
            "event does not request root resource (" + path + ")"
        )
    }

  response = table.get_item(
    Key={
      'ID':'page_view_counter'
    }
  )

  views = response['Item']['views']
  views = views + 1

  print(views)

  response = table.put_item(
    Item={
      'ID':'page_view_counter',
      'views': views
    }
  )

  return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
        },
        'body': "{}".format(
            #response.text
            views
        )
    }