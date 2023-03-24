import boto3
import json
from gqllayer import BackendGqlClass

gql_resource = BackendGqlClass()
gql_client = gql_resource.client()


gql_query = """
mutation MyMutation($s3Uri: String, $ProductType: ProductType = BOTTLE, $count: Int) {
  updateShelfMonitor(input: {s3Uri: $s3Uri, StreamUri: $StreamUri, ProductType: $ProductType, count: $count}) {
      count
      Threshold
      s3Uri
      StreamUri
      ProductType
      createdAt
      updatedOn
  }
}
"""

create_bottle_query = """
mutation MyMutation($s3Uri: String, $ProductType: ProductType = BOTTLE, $Threshold: 3, $count: Int) {
    createShelfMonitor(input: {s3Uri: $s3Uri, StreamUri: $StreamUri, ProductType: $ProductType, count: $count}) {
        count
        Threshold
        s3Uri
        StreamUri
        ProductType
        createdAt
        updatedOn
    }
}
"""

s3 = boto3.client("s3")


def handler(event, context):
    for record in event["Records"]:
        payload = json.loads(record["body"])
        product_type = payload["ProductType"]
        product_count = payload["StockCount"]
        stream_uri = payload["StreamUri"]
        bucket, key = payload["S3Uri"].replace("s3://", "").split("/", 1)

        presigned_url = s3.generate_presigned_url(
            "get_object", Params={"Bucket": bucket, "Key": key}, ExpiresIn=3600
        )

        values = {"s3Uri": presigned_url, "StreamUri": stream_uri ,"count": product_count}

        try:
            mutation = gql_client.execute(
                gql_resource.return_gql(gql_query), variable_values=values
            )
            print(mutation)
        except Exception as e:
            try:
                mutation = gql_client.execute(
                    gql_resource.return_gql(create_bottle_query), variable_values=values
                )
                print(mutation)
            except Exception as ee:
                print(ee)
                raise ee

    return
