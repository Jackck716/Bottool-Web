// aws-dynamodb-connection.js (No credentials included)

AWS.config.update({
  region: 'us-east-1',
  // Access credentials should be injected via Cognito or assumed roles from a secure backend
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

function addTrackingRecord(trackingId, userId, date, driver, station, price) {
  const params = {
    TableName: 'Trackings',
    Item: { trackingId, userId, date, driver, station, price }
  };
  dynamodb.put(params, function (err, data) {
    if (err) console.error('Insert failed:', err);
    else console.log('Inserted:', data);
  });
}

function getTrackingsByUser(userId, callback) {
  const params = {
    TableName: 'Trackings',
    FilterExpression: 'userId = :u',
    ExpressionAttributeValues: { ':u': userId }
  };
  dynamodb.scan(params, function (err, data) {
    if (err) console.error('Fetch failed:', err);
    else callback(data.Items);
  });
}
