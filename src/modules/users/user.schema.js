import { gql } from "apollo-server";

const userType = gql`
  # User
  type User {
    _id: ID!
    email: String!
    documentId: String!
    name: String!
    lastName: String!
    status: userStatus!
    role: Role!
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

  enum userStatusByLeader {
    pending
    authorized
  }
`;

const queries = gql`
  # Query all users
  type Query {
    allUsers: [User]
  }

  type Query {
    userById(_id: ID!): User
  }

  type Query {
    usersByRole(role: Role!): [User]
  }

  type Query {
    userByStatus(status: userStatus!): [User]
  }

  type Query {
    login(email: String!, password: String!): String!
  }
`;

const mutations = gql`
  type Mutation {
    registerUser(input: RegisterInput!): String!
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): User!
  }

  type Mutation {
    updateStateAdmin(input: UpdateStateAdminInput!): User!
  }

  type Mutation {
    updateStateLeader(input: UpdateStateLeaderInput!): User!
  }
`;

const inputs = gql`
  input RegisterInput {
    email: String!
    documentId: String!
    name: String!
    lastName: String!
    role: Role!
    password: String!
  }

  input UpdateUserInput {
    userById: ID!
    email: String
    documentId: String
    name: String
    lastName: String
    password: String
  }

  input UpdateStateAdminInput {
    userById: ID!
    status: userStatus!
  }

  input UpdateStateLeaderInput {
    userById: ID!
    status: userStatusByLeader!
  }
`;

export default [
  userType,
  enums, 
  queries,
  mutations, 
  inputs
];
