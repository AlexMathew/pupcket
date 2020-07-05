import copy
import json
import os
import sys

import boto3


def queue_name(x):
    return f"dev_{x}" if os.environ.get("DEBUG") == "true" else x


class SQS(object):
    count_limit = 10
    size_limit = 256000

    def __init__(
        self,
        aws_region=os.getenv("AWS_REGION"),
        aws_access_key=os.getenv("AWS_ACCESS_KEY"),
        aws_secret_key=os.getenv("AWS_SECRET_KEY"),
        aws_account_number=os.getenv("AWS_ACCOUNT_NUMBER"),
    ):
        self.name = ""
        self.sqs = boto3.resource(
            service_name="sqs",
            region_name=aws_region,
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
        )
        self.aws_account_number = aws_account_number

    def get_queue(
        self, qname, retention_period=14 * 24 * 60 * 60, visibility_timeout=10 * 60
    ):
        self.name = queue_name(qname)
        try:
            self.q = self.sqs.get_queue_by_name(
                QueueName=self.name, QueueOwnerAWSAccountId=self.aws_account_number
            )

        except Exception as e:
            print(f"CREATING NEW QUEUE - {qname}")

            attributes = {
                "DelaySeconds": str(0),
                "VisibilityTimeout": str(visibility_timeout),
                "MessageRetentionPeriod": str(retention_period),
                "ReceiveMessageWaitTimeSeconds": str(0),
            }
            self.q = self.sqs.create_queue(QueueName=self.name, Attributes=attributes)

    def __chunks__(self, data):
        piece = []
        while len(data) > 0:
            limit_reached = False
            piece.append(data.pop())

            size = sys.getsizeof(json.dumps(piece))
            if size >= SQS.size_limit:
                d = piece.pop()
                limit_reached = True

                if len(piece) > 0:
                    data.append(d)

                else:
                    raise Exception("Single Message is too Big")

            if len(piece) == SQS.count_limit or len(data) == 0:
                limit_reached = True

            if limit_reached:
                yield piece
                piece = []

    def count(self):
        return int(self.q.attributes.get("ApproximateNumberOfMessages") or 0)

    def receive(self, count=1, visibility_timeout=10 * 60, wait_time=10):
        doc_count = 0
        docs = []

        while doc_count < count:
            size = count - doc_count
            if size > self.count_limit:
                size = self.count_limit

            resp = self.q.receive_messages(
                MaxNumberOfMessages=size,
                VisibilityTimeout=visibility_timeout,
                WaitTimeSeconds=wait_time,
            )

            if not resp:
                print(f"QUEUE {self.name} IS EMPTY - {doc_count} RECORDS RETRIEVED")
                break

            doc_count += size
            docs.extend(resp)

        return docs

    def send(self, data):
        if type(data) != list:
            data = [data]

        for entries in self.__chunks__(
            [
                {"Id": str(i), "MessageBody": json.dumps(body)}
                for i, body in enumerate(data)
            ]
        ):
            print(f"Sending messages to {self.name}")
            self.q.send_messages(Entries=entries)

    def delete(self, data):
        if type(data) != list:
            data = [data]

        for entries in self.__chunks__(
            [
                {"Id": str(i), "ReceiptHandle": receipt_handle}
                for i, receipt_handle in enumerate(data)
            ]
        ):
            print(f"Deleting messages from {self.name}")
            self.q.delete_messages(Entries=entries)
