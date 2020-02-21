const screenshotmachine = require('screenshotmachine');

module.exports = (apiKey, givenUrl) => {
    // configurations
    const options = {
        url: givenUrl,
        dimension: '1920x1080',
        format: 'jpg',
        cacheLimit: '0',
        delay: '200', //ms
    };
    // link to where the newly generated screenshot is generated in the server
    return screenshotmachine.generateScreenshotApiUrl(apiKey, '', options);
}