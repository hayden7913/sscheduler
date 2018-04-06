const axios = require('axios');
const url = 'http://sscheduler.ps4pxaj2md.us-west-2.elasticbeanstalk.com/getRaw';

axios.get(url)
  .then(res => console.log(res.data));
