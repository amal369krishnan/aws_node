const express = require('express')
const aws = require('aws-sdk')
const config = require('./config.json')

const app = express()

app.get('/',async (req,res)=>{
    try {
      aws.config.setPromisesDependency();
      aws.config.update({
          accessKeyId:config.aws_access_key_id,
          secretAccessKey:config.aws_secret_access_key,
          region:'eu-central-1'
      });
      const s3 = new aws.S3();
      const response = await s3.listObjectsV2({
          Bucket: config.S3_BUCKET_BUCKET,
          Delimiter: '/',
          Prefix: 'assets/'
      }).promise();
      
      return res.json(response)
    } catch (error) {
      console.log('error',error);
    }
  });

  app.put('/',async (req,res)=>{
    try {
      aws.config.setPromisesDependency();
      aws.config.update({
          accessKeyId:config.aws_access_key_id,
          secretAccessKey:config.aws_secret_access_key,
          region:'eu-central-1'
      });
      const s3 = new aws.S3();
      const response = await s3.putObject({
        Bucket: config.S3_BUCKET_BUCKET,
        // Delimiter: '/',
        // Prefix: 'assets/',
        Key:"assets/logo.png",
        ContentType: 'image/png'
    }).promise();
      
      return res.json(response)
    } catch (error) {
      console.log('error',error);
    }
  });

  app.listen('8080',()=>{
    console.log("server running on port : 8080");
  })