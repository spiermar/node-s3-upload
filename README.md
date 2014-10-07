# node-s3-upload

A simple Node.js file uploader that leverages Dropzone and Bootstrap to upload files to Amazon's S3.

## Getting Started

1. Set environment variables

```
export AWS_ACCESS_KEY=<yourpublickey>
export AWS_SECRET_KEY=<yoursecretkey>
export AWS_S3_BUCKET=<yourbucketname>
```

2. Clone this repo

```
$ git clone https://github.com/spiermar/node-s3-upload.git
```

3. Install dependencies

```
$ cd node-s3-upload
$ npm install
```

4. Start application

```
$ node server.js
```