var apigClientFactory = require("aws-api-gateway-client").default;
var apigClient = apigClientFactory.newClient({
  invokeUrl: "https://l2awbsivy5.execute-api.us-east-1.amazonaws.com/dev",
});

export default apigClient;
