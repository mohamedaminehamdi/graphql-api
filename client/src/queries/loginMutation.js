import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export default LOGIN_MUTATION;