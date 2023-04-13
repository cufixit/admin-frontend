import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_udaN1zRTa",
    ClientId: "6m6gc2b93e9d0lnceqg9i3jk2o"
}

export default new CognitoUserPool(poolData);