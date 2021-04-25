# Zeplin HTML to PDF Lambda

This is an AWS Lambda function that converts HTML pages to PDF documents using wkhtmltopdf (0.12.4), it implements a simple interface to read and HTML input and output PDF content.

> **WARNING**: You must use v2.x.x tag if you are using Node.js runtime >=10.x in AWS Lambda.

## Input
Input event to this function has the following structure: 
```
{
    "html": "<!DOCTYPE html><html><head><title>HTML doc</title></head><body>Content<body></html>"
}
```


## Output
It yields a response in the following format: 
```
{
  "data": "JVBERi0xLjQKMSAwIG9iago8PAovVGl0bGUgKP7..."
}
```
`data` is base64 encoding of the converted PDF file. 

## create function in aws

pack the function

npm run pack

upload package.zip to aws S3

```
 aws s3 cp package.zip s3://lambda-htm2pdf
 ```

 follow this guide to create a lambda function 

 Notes: after creating the lambda choose Code Tab then "Upload from"  -> Amazon S3 location and specify the location of package.zip, example: https://lambda-htm2pdf.s3.amazonaws.com/package.zip

 then goto Configuration Tab select Environment variables and create this 

|key | value|
|----|------|
|FONTCONFIG_PATH|/var/task/fonts|

-then follow (this guide)[https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html] to create and deploy API Gateway
-create API key 
-create UsagePlan
-add API stage to UsagePlan
-goto resource -> click on method (ANY) click Method Request in settings API Key Required set to true.
-re deploy to stage (actions -> api actions -> Deploy)



## Test in local environment
The function can be tested locally using [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html). You can change contents of `events/example-event.json` or you can create a new file which you will give sam as an event parameter.

```
sam local invoke "HtmlToPdf" -e events/example-event.json
````

## Deploying to AWS
There are two ways in which these functions can be deployed to AWS.

1 - Check our `npm run deploy:dev` and `npm run deploy:prod` commands in `package.json` and change it according to your needs. Do not forget to add environment variables (you can find it under `template.yml`) to your lambda function in aws lambda edit page or running [lamba update-function-configuration command](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-configuration.html).

2 - Check out `template.yml` file and edit according to your needs then use `sam deploy`.

