import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function create(event, context) {

    const { title } = event.body;
    
    const auction = {
      id: uuid(),
      title,
      status: 'OPEN',
    };
  
    try {
      await dynamodb.put({
        TableName: process.env.STUDENTS_TABLE_NAME,
        Item: auction,
      }).promise();
    } catch(error) {
      console.error(error);
      throw new createError.InternalServerError(error);
    }
  
    return {
      statusCode: 201,
      body: JSON.stringify(auction),
    };
}

export const handler = commonmiddleware(create);