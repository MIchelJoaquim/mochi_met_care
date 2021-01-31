import { DynamoDB } from "aws-sdk";
import * as uuid from "uuid";
import { getErrorResponse, getSuccessResponse } from "../shared/response";
import { userDTO } from "./userDTO";

export async function create(user: userDTO) {
        
    try {
        const dynamoDB = new DynamoDB.DocumentClient();

        const params = {
          TableName: process.env.DYNAMO_TABLE,
          Item: {
            id:     uuid.v1(),
            email:  user.email,
            nome:   user.nome 
          },
        };
        await dynamoDB.put(params).promise();
        return getSuccessResponse(JSON.stringify({message: "Utilizador criado!" ,user: params.Item}));

      } catch (err) {
        console.error(err);
        return getErrorResponse(err);
      }
}
