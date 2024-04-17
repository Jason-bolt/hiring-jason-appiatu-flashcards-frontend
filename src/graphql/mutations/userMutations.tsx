import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($data: newUserInput!) {
    registerUser(data: $data) {
      status
      message
      data {
        id
        username
      }
    }
  }
`;
const SIGNIN = gql`
  mutation Login($data: loginInput!) {
    login(data: $data) {
      status
      message
      data {
        token
      }
    }
  }
`;

const userMutations = {
  REGISTER_USER,
  SIGNIN,
};

export default userMutations;
