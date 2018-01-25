const fetch = require('node-fetch');
const fs = require('fs');
const herokuGetCardsURL = 'https://sscheduler.herokuapp.com/getRaw';

fetch(herokuGetCardsURL)
  .then(function(response) {
  	return response.json();
  })
  .then(function(json) {
    const cards = JSON.stringify(json[0].cards, null, 2);
    const newFileName = process.argv[2];
    const newFilePath = __dirname + '/' + newFileName
    const doesFileExist = fs.existsSync(newFilePath);

    if (doesFileExist) {
      throw new Error("File already exists. Choose a different name.")
    }

    const message = `cards = ${cards} \n\nmodule.exports = cards;`
    fs.writeFile(newFileName, message, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch(function(err){
    console.log(err);
  })
  ;
