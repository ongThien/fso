import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          openIssuesCount
          url
          ownerAvatarUrl
          description
          language
          userHasReviewed
        }
      }
    }
  }
`;



export const GET_ACCESS_TOKEN = gql`
  mutation Authenticate($credentials: AuthenticateInput!){
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
