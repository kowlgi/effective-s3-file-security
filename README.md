effective-s3-file-security
==========================
This repository is for the purposes of demonstrating a few mechanisms for AWS S3 file security. The repository contains scripts to set up S3 and a web app to help explain concepts in an easy to understand manner.

GETTING STARTED
---------------
Clone this repository on your computer.

BUCKET SETUP
------------
Open a terminal and cd to the bucketSetup folder. Run:
    chmod +x setupEncryptionBucket.sh
    chmod +x setupSigningBucket.sh

APP SETUP
---------
NOTE: The app has only been tested on nodejs v8.11.1.

Open a terminal and cd to the app folder. Install dependencies :
    npm install

Once all the dependencies have been installed, run:
    mkdir build
    browserify app.js > build/build.js

Next start a webserver and point it to the app folder. You can run:
    python -m SimpleHTTPServer 3000
    lt --port 3000

The lt command provides a url for the web app. Open the url in your browser and you can use the app.
