import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_XdqZBOfji",
  ClientId: "4km322kn7codmd495hvt8p76t0",
};

export default new CognitoUserPool(poolData);
