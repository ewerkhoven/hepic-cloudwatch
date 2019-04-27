<img src="https://github.com/sipcapture/homer-app/raw/master/public/img/homerseven.png" width=100 />

# HEP PUBSUB Endpoint
    "does anyone know anything about this thing?"

[HOMER](https://github.com/sipcapture/homer-app) Seven allows external agents to subscribe capabilities to provide *"on-demand"* session details from external APIs, databases, etc. to argument internally available data without requiring data duplication and allowing creative use of the core HEP platform.

This application publishes itself as an endpoint for the HEP Pub-Sub API, announcing its endpoints providing on-demand complementary information about correlated sessions.

#### Guide
This example project does not provide any actual logic and implements the basic pub-sub mechanism plus a sample endpoint returning JSON data to be extended with any desirable action such as looking up logs, events, packets and returning them to a standard or custom handler.

##### Install
```
npm install
```
##### Configure
Configure your HOMER 7 API and local Endpoint address in file `config.js`

##### Initialize
```
npm start
```
##### Test
To test the API using CURL use or modify the following example
```
curl -d '{"callid":"1bbe7bd220786cbd", "from_time":"1543249025", "to_time":"1543259025"}' -H "Content-Type: application/json" -X POST http://server.address:18088/get/something
```

---------

#### Made by Humans
This Open-Source project is made possible by actual Humans without corporate sponsors, angels or patreons.<br>
If you use this software in production, please consider supporting its development with contributions or [donations](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=donation%40sipcapture%2eorg&lc=US&item_name=SIPCAPTURE&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest)

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=donation%40sipcapture%2eorg&lc=US&item_name=SIPCAPTURE&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest) 

###### (C) 2008-2019 QXIP BV
