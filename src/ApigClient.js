var apigClientFactory = require("aws-api-gateway-client").default;
var apigClient = apigClientFactory.newClient({
  invokeUrl: "https://5lwy0rlv1k.execute-api.us-east-1.amazonaws.com/dev",
});

export default apigClient;
