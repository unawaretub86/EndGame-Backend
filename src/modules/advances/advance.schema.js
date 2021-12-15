import { gql } from 'apollo-server';

const advanceType = gql`
  # Advance
  type Advance {
    _id: ID!
    enrollment_id: ID!
    addDate: String!
    description: String!
    leaderDate: String
    observations: String
    enrollment: Enrollment
  }
`;

const queries = gql`
  # Return all advances
  type Query {
    allAdvances: [Advance]
  }

  # Return advance by id
  type Query {
    advaceById(_id: ID!): Advance!
  }
`;

const mutations = gql`
  # Add advance
  type Mutation {
    addAdvance(input: AddAdvanceInput!): Advance!
  }

  # Add observation
  type Mutation {
    addObservation(input: AddObservationInput!): Advance!
  }
`;

const inputs = gql`
  input AddAdvanceInput {
    enrollment_id: ID!
    addDate: String!
    description: String!
  }

  input AddObservationInput {
    advaceById: ID!
    observations: String!
  }
`;

export default [
    queries,
    advanceType,
    mutations,
    inputs
];