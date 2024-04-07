import { gql } from "@apollo/client";

export const GET_ALL_PERSONS = gql`
  query {
    getAllPersons {
      id
      name
    }
  }
`;
