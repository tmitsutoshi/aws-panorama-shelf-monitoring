/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShelfMonitor = /* GraphQL */ `
  query GetShelfMonitor($StreamUri: String!) {
    getShelfMonitor(StreamUri: $StreamUri) {
      s3Uri
      count
      ProductType
      Threshold
      StreamUri
      createdAt
      updatedOn
    }
  }
`;
export const listShelfMonitors = /* GraphQL */ `
  query ListShelfMonitors(
    $StreamUri: String
    $filter: ModelshelfMonitorFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listShelfMonitors(
      StreamUri: $StreamUri
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        s3Uri
        count
        ProductType
        Threshold
        StreamUri
        createdAt
        updatedOn
      }
      nextToken
    }
  }
`;
