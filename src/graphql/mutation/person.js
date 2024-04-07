import { gql } from "@apollo/client";

export const CREATE_PERSON = gql`
  mutation createPerson($input: PersonInput) {
    createPerson(input: $input) {
      id
      name
      lastname
    }
  }
`;
