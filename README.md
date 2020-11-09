<img src="https://user-images.githubusercontent.com/1423657/55069501-8348c400-5084-11e9-9931-fefe0f9874a7.png" width=200/>

# HEP PUBSUB AWS Cloudwatch integration
    "gluey"

[HOMER](https://github.com/sipcapture/homer-app) Seven allows external agents to subscribe capabilities to provide *"on-demand"* session details from external APIs, databases, etc. to argument internally available data without requiring data duplication and allowing creative use of the core HEP platform.

#### So What?

This application publishes itself as an endpoint for the HEP Pub-Sub API, announcing its capabilities to asyncronously return on-demand complementary information about correlated sessions. This particular implementation is a simple adaptation of the hello-world example.

#### What does this do?
This first stab at integration of homer with AWS cloudwatch allows http requests like this:
```
wget -qO - --post-data='{"filterPattern":"5f73b856-0000-31b17963-0ca0cb1b-6cb21796"}' --header='Content-Type:application/json' 'http://sipdr4000.tst2.livevox.net:18088/cloudwatch/us-east-1/sipdr/sipcop4003'
```
where the url path after 'cloudwatch' indicates aws region, log group and individual instance respectively. The filterPattern will be used in a free text search.

##### Install
```
npm install
```
##### Configure
Configure your HOMER 7 API and local Endpoint address in file `config.js`. Configure your AWS credentials in file `config.json` (confusing, I know, will clean up later) in the following format:
```
{ "accessKeyId": "[AWS key]", "secretAccessKey": "[AWS secret]", "region": "[AWS region]" }
```
##### Initialize
```
npm start
```
------
