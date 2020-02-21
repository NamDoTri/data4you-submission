const fs = require('fs');
const generateScreenshot = require('./generateScreenshot');
const screenshotmachine = require('screenshotmachine');

// parse arguments from command prompt
let apiKey = process.argv[2]; // for security reasons, API key will be provided at run time
let fileName = process.argv[3]
let givenUrl = process.argv[4];

// generate screenshots
let imgUrl = generateScreenshot(apiKey, givenUrl);

// create Downloads folder 
if(!fs.existsSync('./Downloads')) fs.mkdirSync('./Downloads');

// download the screenshot to local storage
let path = `./Downloads/${fileName}.jpg`;
let ws = fs.createWriteStream(path);
ws.on('close', () => {
    console.log('1 screenshot saved to ' + path);
})
screenshotmachine.readScreenshot(imgUrl).pipe(ws);

// upload to Google Drive
