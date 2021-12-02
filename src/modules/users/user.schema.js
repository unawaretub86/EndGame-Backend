import { gql } from "apollo-server";

const userType = gql`
  # User
  type User {
    _id: ID!
    email: String!
    documentId: Float!
    name: String!
    status: userStatus!
    lastName: String!
    role: Role!
    password: String!
  }
`;

const enums = gql`
  # Enum for role values
  enum Role {
    admin
    leader
    student
  }

  # Enum for status values
  enum userStatus {
    pending
    authorized
    unauthorized
  }
`;

const queries = gql`
  # Query all users
  type Query {
    allUsers: [User]
  }

  type Query {
    Role(role: Role): User
  }

  type Query {
    user(_id: ID!): User
  }
`;

const mutations = gql`
  type Mutation {
    addUser(input: AddUserInput!): User!
  }
`;

const inputs = gql`
  input AddUserInput {
    email: String!
    documentId: Float!
    name: String!
    lastName: String!
    fullName: String!
    status: userStatus!
    role: Role!
    password: String!
  }
`;

export default [userType, enums, queries, mutations, inputs];
