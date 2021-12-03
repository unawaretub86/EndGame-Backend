import { gql } from 'apollo-server';

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
`;

const mutations = gql`
  type Mutation {
    addEnrollment(input: AddEnrollmentInput!): Enrollment
  }
`;

const inputs = gql`
  input AddEnrollmentInput {
    project_id: ID!
    user_id: ID!
  }
`;

export default [
  queries,
  mutations,
  enrollmentType,
  enums, 
  inputs
];
