'use strict';

const AWS = require('aws-sdk');

function getUniqueIndex(currency) {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const tableName = 'IdStore';
  const tableNameWithStage = process.env.SERVICE_NAME+'-'+process.env.SLS_STAGE+'-'+tableName;
  const params = {
      TableName: tableNameWithStage,
      Key: {'currency': currency},
      UpdateExpression: "set #idx = #idx + :incva",
      ExpressionAttributeNames:{
        "#idx":"index"
      },
      ExpressionAttributeValues:{
        ":incva": 1
      },
      ReturnValues: 'UPDATED_NEW'
  };

  return dynamo.update(params).promise()
  .then((result) => {
    return result.Attributes.index;
  });
};

function storeAddress(currency, index, customId, address) {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const tableName = 'AddressStore';
  const tableNameWithStage = process.env.SERVICE_NAME+'-'+process.env.SLS_STAGE+'-'+tableName;

  const payload = {
    id: (currency + '-' + index.toString()),
    index: index,
    custom_id: customId,
    address: address
  };

  const params = {
    TableName: tableNameWithStage,
    Item: payload
  };

  return dynamo.put(params).promise();
};

module.exports = {
  getUniqueIndex: getUniqueIndex,
  storeAddress: storeAddress,
};
