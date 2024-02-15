# AWS Lambda Screenshot Puppeteer

## Overview
This repository contains code for capturing website screenshots using Puppeteer in an AWS Lambda function. It allows you to generate screenshots of web pages programmatically.

## Features
- Utilizes Puppeteer for browser automation.
- Integration with AWS Lambda for serverless execution.
- Supports capturing screenshots of any publicly accessible website.
- Saves screenshots to Amazon S3 for easy storage and retrieval.

## Requirements
- Node.js
- AWS Account with Lambda and S3 permissions
- Chrome AWS Lambda layer (provided by `chrome-aws-lambda` package)

## Usage
1. Clone the repository: `git clone https://github.com/KerwinChina/aws-lambda-screenshot-puppeteer.git`
2. Install dependencies: `npm install`
3. Deploy the AWS Lambda function using the provided code.
4. Set up an API Gateway or trigger the Lambda function through other means.
5. Pass the URL of the website as a query parameter to the Lambda function.
6. The function will capture the screenshot and store it in the specified Amazon S3 bucket.
7. Retrieve the URL of the saved screenshot from the Lambda function response.

## Configuration
- Modify the AWS S3 bucket name in the Lambda function code.
- Ensure the Lambda function has appropriate IAM permissions to interact with S3.

## Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

