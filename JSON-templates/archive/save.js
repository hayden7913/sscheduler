const axios = require('axios');
const fs = require('fs');
const getCardsURL = 'http://sscheduler.ps4pxaj2md.us-west-2.elasticbeanstalk.com/getRaw';

axios(getCardsURL)
.then(function(response) {
  return response.data;
})
.then(function(json) {
  const cards = JSON.stringify(json[0].cards, null, 2);
  const newFileName = process.argv[2];
  const newFilePath = __dirname + '/' + newFileName
  const doesFileExist = fs.existsSync(newFilePath);

  if (false) {
    throw new Error("File already exists. Choose a different name.")
  }

  const message = `const cards = ${cards} \n\nmodule.exports = cards;`
  fs.writeFile(newFileName, message, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
})
.catch(function(err){
  console.log(err);
})
;
