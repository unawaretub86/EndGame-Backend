import { gql } from "apollo-server";

const projectType = gql`
  # Project
  type Project {
    _id: ID!
    name: String!
    generalObjective: String!
    specificObjectives: [String]!
    budget: Float!
    startDate: String
    endDate: String
    leader_id: ID!
    status: projectStatus
    phase: Phase
    leader: User
  }
`;

const enums = gql`
  # Enum for status values
  enum projectStatus {
    active
    inactive
  }

  # Enum for phase values
  enum Phase {
    started
    inProgress
    ended
  }
`;

const queries = gql`
  # Query all projects
  type Query {
    allProjects: [Project]!
  }

  type Query {
    projectById(_id: ID!): Project!
  }

  type Query {
    projectByPhase(phase: Phase!): [Project]!
  }

  type Query {
    projectByStatus(status: projectStatus!): [Project]!
  }

  type Query {
    projectByLeaderId(leader_id: ID!): [Project]!
  }
`;

const mutations = gql`
  type Mutation {
    addProject(input: AddProjectInput!): Project!
  }
  type Mutation {
    updateProject(input: UpdateProjectInput!): Project!
  }

  type Mutation {
    activetProject(input: ActiveProjectInput!): Project!
  }
`;

const inputs = gql`
  input AddProjectInput {
    name: String!
    generalObjective: String!
    specificObjectives: [String]!
    budget: Float!
    leader_id: ID!
  }

  input UpdateProjectInput {
    projectById: ID!
    name: String
    generalObjective: String
    specificObjectives: [String]
    budget: Float
    startDate: String
    endDate: String
    status: projectStatus
    phase: Phase
  }

  input ActiveProjectInput {
    _id: ID!
    status: projectStatus!
  }
`;

export default [projectType, enums, queries, mutations, inputs];
