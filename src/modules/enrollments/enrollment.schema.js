import { gql } from "apollo-server";

const enrollmentType = gql`
  # Enrollment
  type Enrollment {
    _id: ID
    status: EnrollmentStatus
    enrollmentDate: String
    egressDate: String
    project: Project!
    student: User!
  }
`;

const enums = gql`
  # Enum for status values
  enum EnrollmentStatus {
    acepted
    rejected
  }
`;

const queries = gql`
  # Query all enrollments
  type Query {
    allEnrollments: [Enrollment]
  }

  type Query {
    enrollmentById(_id: ID!): Enrollment!
  }
`;

const mutations = gql`
  type Mutation {
    changeStatusEnrollment(input: changeStatusInput!): Enrollment!
  }
`;

const inputs = gql`
  input changeStatusInput {
    _id: ID!
    status: EnrollmentStatus!
  }
`;

export default [enrollmentType, enums, queries, mutations, inputs];
