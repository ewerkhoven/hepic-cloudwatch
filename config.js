var config = {
  backend: 'http://vimp1001.na5b.mtl1.livevox.net:80/api/v3/agent/subscribe',
  token: '34819d7beeabb9260a5c854bc85b3e44',
  service: {
	"uuid": Math.random().toString(36).substring(7),
	"host":"sipdr4000.tst2.livevox.net",
	"port": 18088,
	"protocol": "http",
	"path": "/get",
	"type": "cdr",
	"ttl": 300,
	"node": "cloudwatch",
	"gid": 10
  },
  debug: true,
  cloudwatchDefaults: {
    	region: "us-east-1",
    	logGroupName: {
 		sipdr:"/tst2/sipdr_7.1/sipdr.log"
	}
  } 
};

module.exports = config;
