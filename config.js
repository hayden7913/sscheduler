require('dotenv').config()

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://hayden321:46869269a@ds121696.mlab.com:21696/sscheduler';

exports.PORT = process.env.PORT || 3001;
