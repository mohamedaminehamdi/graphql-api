import { gql } from '@apollo/client';

const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      email
    }
  }
`;

export default GET_ALL_USERS;