import {gql } from 'apollo-angular';
export const loginUser = gql`
query MyQuery($userId:String,$password:String) {
    users(where: {password: {_eq: $password}, userId: {_eq: $userId}}) {
      id
      firstName
      lastName
      email
      phone
      userId
    }
  }
`;

export const signUpUser=gql`
mutation signup($userObj: users_insert_input!) {
  insert_users_one(object: $userObj) {
    id
  }
}
`;