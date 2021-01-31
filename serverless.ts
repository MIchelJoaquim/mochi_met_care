import type { Serverless } from 'serverless/aws'

const SERVICE_NAME = 'mochi'
const DYNAMO_TABLE = `${SERVICE_NAME}-user`
const USER_TABLE = `${SERVICE_NAME}-user`
const S3_BUCKET = 'mochi-dev-serverlessdeploymentbucket-yxowqwmpxqsb'
const S3_BUCKET_PDF = 'mochi-pdf'
const AWS_REGION = 'us-east-1'
const serverlessConfiguration: Serverless = {
  service: {
    name: SERVICE_NAME
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    stage: 'dev',
    region: `${AWS_REGION}`,
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DYNAMO_TABLE,
      S3_BUCKET,
      S3_BUCKET_PDF,
      REGION: `${AWS_REGION}`
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: '*'
      },
      {
        Effect: 'Allow',
        Action: ['s3:ListAllMyBuckets', 's3:PutObject', 's3:GetObject'],
        Resource: 'arn:aws:s3:::*'
      },
      {
        Effect: 'Allow',
        Action: ['ses:*'],
        Resource: '*'
      }
    ]
  },
  functions: {
    save: {
      handler: 'handler.save',
      events: [
        {
          http: {
            method: 'post',
            path: 'user',
            cors: true
          }
        }
      ]
    },
    upload: {
      handler: 'handler.upload',
      events: [
        {
          http: {
            method: 'post',
            path: 'upload',
            cors: true
          }
        }
      ]
    },
    pdfUpload: {
      handler: 'pdfUpload.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'pdf',
            cors: true
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      UserTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'email',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'email',
              KeyType: 'HASH'
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
          TableName: USER_TABLE
        }
      }
    }
  }
}

module.exports = serverlessConfiguration
