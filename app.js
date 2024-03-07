// JOURNEY BUILDER CUSTOM ACTIVITY - discount-code ACTIVITY
// ````````````````````````````````````````````````````````````
// SERVER SIDE IMPLEMENTATION
//
// This example demonstrates
// * Configuration Lifecycle Events
//    - save
//    - publish
//    - validate
// * Execution Lifecycle Events
//    - execute
//    - stop

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const configJSON = require('./config-json');

const app = express();


app.use(bodyParser.json());

app.use(express.static('public'));

app.set('port', (process.env.PORT || 8080));;

// setup the discount-code example app
    // const moduleDirectory = `${options.rootDirectory}/modules/discount-code`;

    // setup static resources
    // app.use('/modules/discount-code/dist', express.static(`${moduleDirectory}/dist`));
    // app.use('/modules/discount-code/images', express.static(`${moduleDirectory}/images`));

    // setup the index redirect
app.get('/', function(req, res) {
    return res.redirect('index.html');
});
app.get('/postmonger.js', function(req, res) {
    return res.redirect('/js/postmonger.js');
});

// // setup index.html route
// app.get('/index.html', function(req, res) {
//     // you can use your favorite templating library to generate your html file.
//     // this example keeps things simple and just returns a static file
//     return res.sendFile(path.join(__dirname, '/public/index.html'));
// });

// setup config.json route
// app.get('/config.json', function(req, res) {
//     // Journey Builder looks for config.json when the canvas loads.
//     // We'll dynamically generate the config object with a function
//     console.log("here");
//     return res.status(200).json(configJSON.configJSON(req));
// });

// ```````````````````````````````````````````````````````
// BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
//
// CONFIGURATION
// ```````````````````````````````````````````````````````
// Reference:
// https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/interaction-operating-states.htm

/**
 * Called when a journey is saving the activity.
 * @return {[type]}     [description]
 * 200 - Return a 200 iff the configuraiton is valid.
 * 30x - Return if the configuration is invalid (this will block the publish phase)
 * 40x - Return if the configuration is invalid (this will block the publish phase)
 * 50x - Return if the configuration is invalid (this will block the publish phase)
 */
app.post('/save', function(req, res) {
    console.log('debug: /save');
    return res.send(200, 'Save');
    // return res.status(200).json({});
});

/**
 * Called when a Journey has been published.
 * This is when a journey is being activiated and eligible for contacts
 * to be processed.
 * @return {[type]}     [description]
 * 200 - Return a 200 iff the configuraiton is valid.
 * 30x - Return if the configuration is invalid (this will block the publish phase)
 * 40x - Return if the configuration is invalid (this will block the publish phase)
 * 50x - Return if the configuration is invalid (this will block the publish phase)
 */
app.post('/publish', function(req, res) {
    console.log('debug: /publish');
    return res.status(200).json({});
});

/**
 * Called when Journey Builder wants you to validate the configuration
 * to ensure the configuration is valid.
 * @return {[type]}
 * 200 - Return a 200 iff the configuraiton is valid.
 * 30x - Return if the configuration is invalid (this will block the publish phase)
 * 40x - Return if the configuration is invalid (this will block the publish phase)
 * 50x - Return if the configuration is invalid (this will block the publish phase)
 */
app.post('/validate', function(req, res) {
    console.log('debug: /validate');
    return res.status(200).json({});
});


// ```````````````````````````````````````````````````````
// BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
//
// EXECUTING JOURNEY
// ```````````````````````````````````````````````````````

/**
 * Called when a Journey is stopped.
 * @return {[type]}
 */
app.post('/stop', function(req, res) {
    console.log('debug: /stop');
    return res.status(200).json({});
});

/**
 * Called when a contact is flowing through the Journey.
 * @return {[type]}
 * 200 - Processed OK
 * 3xx - Contact is ejected from the Journey.
 * 4xx - Contact is ejected from the Journey.
 * 5xx - Contact is ejected from the Journey.
 */
app.post('/execute', function(req, res) {
    console.log('debug: /execute');

    const request = req.body;

    console.log(" req.body", JSON.stringify(req.body));

    // example: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/example-rest-activity.htm
    // const discountInArgument = getInArgument('discount') || 'nothing';
    // const responseObject = {
    //     discount: discountInArgument,
    //     discountCode: generateRandomCode() + `-${discountInArgument}%`
    // };

    // console.log('Response Object', JSON.stringify(responseObject));

    return res.status(200).json(request);
});

app.listen(app.get('port'), function() {
    console.log(`Express is running at localhost: ${app.get('port')}`);
});
