/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteShelfMonitor = /* GraphQL */ `
  mutation DeleteShelfMonitor(
    $input: DeleteShelfMonitorInput!
    $condition: ModelshelfMonitorConditionInput
  ) {
    deleteShelfMonitor(input: $input, condition: $condition) {
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
export const createShelfMonitor = /* GraphQL */ `
  mutation CreateShelfMonitor(
    $input: CreateShelfMonitorInput!
    $condition: ModelshelfMonitorConditionInput
  ) {
    createShelfMonitor(input: $input, condition: $condition) {
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
export const updateShelfMonitor = /* GraphQL */ `
  mutation UpdateShelfMonitor(
    $input: UpdateShelfMonitorInput!
    $condition: ModelshelfMonitorConditionInput
  ) {
    updateShelfMonitor(input: $input, condition: $condition) {
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
