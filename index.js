const fs = require('fs');
const screenshotmachine = require('screenshotmachine');

// parse arguments from command prompt
let apiKey = process.argv[2]; // for security reasons, API key will be provided at run time
let file_id = process.argv[3];
let file_name = process.argv[4]
let givenUrl = process.argv[5];

// configurations
let options = {
    url: givenUrl,
    dimension: '1920x1080',
    format: 'jpg',
    cacheLimit: '0',
    delay: '200', //ms
};

// link to where the newly generated screenshot is generated in the server
let imgUrl = screenshotmachine.generateScreenshotApiUrl(apiKey, '', options);

// create Downloads folder 
if(!fs.existsSync('./Downloads')) fs.mkdirSync('./Downloads');

// download the screenshot to local storage
let path = `./Downloads/${file_id}_${file_name}.jpg`;
let ws = fs.createWriteStream(path);
ws.on('close', () => {
    console.log('1 screenshot saved to ' + path);
})
screenshotmachine.readScreenshot(imgUrl).pipe(ws);