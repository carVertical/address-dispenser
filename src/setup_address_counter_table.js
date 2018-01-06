'use strict';

var AWS = require('aws-sdk');

function addAddressCounterStart(currency) {
  return new Promise((resolve, reject) => {
    const tableName = 'IdStore';
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const tableNameWithStage = process.env.SERVICE_NAME+'-'+process.env.SLS_STAGE+'-'+tableName;
    const payload = {
      'currency': currency,
      'index': -1
    };
    const params = {
      TableName: tableNameWithStage,
      Item: payload,
    };

    return dynamo.put(params).promise();
  });
};

// THIS HAS TO BE RUN ONLY ONCE PER PROJECT
function addBTCLTCStart() {
  addAddressCounterStart('btc');
  addAddressCounterStart('ltc');
};

module.exports = {
  setup: addBTCLTCStart
};
