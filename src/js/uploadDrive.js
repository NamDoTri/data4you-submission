const fs = require('fs');
const {google} = require('googleapis');
const authorize = require('./authorizeDrive');

module.exports = (fileName, data) => {
    // check for credentials
    fs.readFile('./src/credentials.json', (err, content) => {
        if(err){
            console.log('Error loading client secret file:', err);
        }else{
            authorize(JSON.parse(content), (auth) => {
                uploadImage(auth, fileName, data)
            });
        }
    });
}

function uploadImage(auth,fileName, data) {
    const drive = google.drive({version: 'v3', auth});
    const fileMetadata = {
        'name': fileName,
        "parents": ["1Lac_0i-yfPHaeJMQ8t63D5olRrvg108t"]  // Data4You submission folder ID
    };
    const media = {
        mimeType: "image/jpeg",
        body: fs.createReadStream(data)
    };
    
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, (err, file) => {
        if(err){
            console.log(err)
        }else{
            console.log('1 file uploaded to Drive.')
        }
    });
}