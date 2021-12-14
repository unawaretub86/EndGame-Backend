import { gql } from 'apollo-server';

const advanceType = gql`
  # Advance
  type Advance {
    _id: ID
    project_id: ID!
    addDate: String!
    description: String!
    observations: String
    project: Project
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
    project_id: ID!
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