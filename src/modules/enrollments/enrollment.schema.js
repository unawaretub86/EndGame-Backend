import { gql } from "apollo-server";

const enrollmentType = gql`
  # Enrollment
  type Enrollment {
    _id: ID!
    project_id: ID!
    user_id: ID!
    status: EnrollmentStatus
    enrollmentDate: String
    egressDate: String
    project: Project
    student: User
    advances: [Advance]
  }
`;

const enums = gql`
  # Enum for status values
  enum EnrollmentStatus {
    pending
    accepted
    rejected
  }
`;

const queries = gql`
  # Query all enrollments
  type Query {
    allEnrollments: [Enrollment]!
  }

  type Query {
    enrollmentById(_id: ID!): Enrollment!
  }

  type Query {
    enrollmentByUserId(user_id: ID!): [Enrollment]
  }
`;

const mutations = gql`
  type Mutation {
    addEnrollment(input: addEnrollmentInput!): Enrollment!
  }

  type Mutation {
    changeStatusEnrollment(input: changeStatusInput!): Enrollment!
  }
`;

const inputs = gql`
  input addEnrollmentInput {
    project_id: ID!
    user_id: ID!
  }

  input changeStatusInput {
    _id: ID!
    status: EnrollmentStatus!
  }
`;

export default [enrollmentType, enums, queries, mutations, inputs];
