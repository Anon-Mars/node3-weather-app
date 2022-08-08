console.log('--------------- App main file is running (src/app.js) ---------------')

// If looking for example 1, go to notes-app folder -> app.js file (Examples 1 - 11)
// If looking for example 12, go to weather-app folder -> app.js file (Examples 12 - 16)
// If looking for example 17, go to web-server folder -> app.js file (Examples 17 - 18)

const currentLiveExample = 20

if (currentLiveExample === 19) {

    console.log('--------------------------- EXAMPLE 19 --->')
    
                // Example 19 - files included: app.js, (index.hbs, help.hbs, about.hbs) inside of views folder

    console.log('>>> Gainig access to express module (app.js)')
    const express = require('express')

    const path = require('path')

    const publicFolderDirectoryPath = path.join(__dirname, '../public')

    const app = express()

    app.set('view engine', 'hbs') // npm i hbs
    // this app.set() function labeled for express by the first param 'view engine', along with hbs npm module takes care of what is called handlebars
    // this is used to create dynamic templates, hbs file is an html file with handlebars

    app.use(express.static(publicFolderDirectoryPath))

    // here as you notice app.get(...) is back and that's because the previous use of index/about/help.html was a static use
    // in this case we want to make it a dynamic use
    app.get('', (req, res) => { // in this case no need for file extension because it was defined in app.set() func already

        // what makes it a dynamic html url is that we can send data from here to be reflected on the hbs file
        res.render('index', {
            title: 'Weather App',
            name: 'Marwan'
        })
        // if you go to index.hbs you notice we access the title in the header like this: <h1>{{title}}</h1> and that's it
        // as well as it can be injected within text: <p>Created by: {{name}}</p>
    })

    app.get('/about', (req, res) => {

        res.render('about', {
            title: 'About me',
            name: 'Marwan Abdulhadi'
        })
    })

    app.get('/help', (req, res) => {

        res.render('help', {
            title: 'Help Needed?',
            message: 'The end is near anyway, help yourself...'
        })
    })

    app.get('/weather', (req, res) => {
    
        res.send({
            forecast: 'Sunny with extra cheese, no lettuce',
            location: 'Spaghetti Planet - Spiral city'
        })
    })

    app.listen(3000, () => {

        console.log('Server is up on port 3000')
    })

    console.log('------------------------------<')

} // end of current live example check '19'

//---------------------------------------------------------------------------------------

if (currentLiveExample === 20) {

    console.log('--------------------------- EXAMPLE 20 --->')
    
                // Example 20 - files included: app.js, (index.hbs, help.hbs, about.hbs) inside of templates/views folder, (header.hbs) inside of templates/partials,
                                            // (geocode.js, forecast.js) inside of src/utils copied from weather-app with npm i request installed

    // views directory is the default folder that express expects and if you take your hbs to another folder, app will fail
    // this example demonstrates how to give express a folder to read hbs files from

    console.log('>>> Gainig access to express module (app.js)')
    const express = require('express')
    const hbs = require('hbs')

    const path = require('path')

    // Define paths for express config
    const publicFolderDirectoryPath = path.join(__dirname, '../public')
    const viewsPath = path.join(__dirname, '../templates/views')
    const partialsPath = path.join(__dirname, '../templates/partials')

    console.log('>>> Gainig access to geocode.js')
    const geocode = require('./Utils/geocode')
    console.log('>>> Gainig access to forecast.js')
    const forecast = require('./Utils/forecast')

    const app = express()

    // Setup handlebars engine and views location
    app.set('view engine', 'hbs')
    console.log('>>> Gainig access to templates/views folder')
    app.set('views', viewsPath) // after defining our new views path in templates/views folder, we give to express here to be identified

    console.log('>>> Gainig access to partials folder')
    hbs.registerPartials(partialsPath)
    // In order to deal with handlebars partials, we had to add it as a const of hbs, then give it a folder and register the folder path here

    // Partials are not full html files, they are a part of it such as a header, to add a partial to the deired html file we add it like this:
    // {{>filename}} , note here we did not have to add a path or file extension

    // note that some error may occur due to nodemon running while editing or creating hbs file, since nodemon only restarts at app.js saving
    // to handle such error we add a few extra thing to nodemon run:
    // nodemon app.js -e js,hbs OR nodemon src/app.js -e js,hbs

    // Setup static directory to serve
    console.log('>>> Gainig access to public folder')
    app.use(express.static(publicFolderDirectoryPath))

    app.get('', (req, res) => {

        res.render('index', {
            title: 'Weather App',
            name: 'Marwan'
        })
    })

    app.get('/about', (req, res) => {

        res.render('about', {
            title: 'About me',
            name: 'Marwan'
        })
    })

    app.get('/help', (req, res) => {

        res.render('help', {
            title: 'Help Needed?',
            message: 'Hold tight, help is on the way...',
            name: 'Marwan'
        })
    })

    // since our 3 main sites have title property, we can put that in our header.hbs partial and put that partial in each hbs file related to them

    app.get('/weather', (req, res) => {

        // req.query is what is passed through the url, you can then check for a specific keyword to check for it input value
        // http://localhost:3000/weather?address=amman

        if (!req.query.address) { // if address keyword was not passed in url then throw an error telling user to provide an address
            res.send({
                error: 'You must provide an address'
            })
            return
        }
    
        console.log(req.query.address)

        geocode.geoCodeD(req.query.address, (error, {latitude, longitude, placeName} = {}) => {

            if (error) {

                res.send({
                    error: error
                })
                return
            }

            forecast.forecastD(latitude, longitude, (error, {description, temperature, feelsLike} = {}) => {

                if (error) {
                    res.send({
                        error: error
                    })
                    return
                }

                res.send({
                    forecast: description + '. It is currently ' + temperature + ' degrees out, It feels like ' + feelsLike + ' degrees out.',
                    location: placeName,
                    searchedAddress: req.query.address
                })
            })
        })
    })

    app.get('/raw', (req, res) => {

        if (!req.query.address) {
            res.send({
                error: 'You must provide an address',
                searchedFor: req.query
            })
            return
        }

        console.log(req.query.address)

        geocode.geoCodeD(req.query.address, (error, {latitude, longitude, placeName} = {}) => {

            if (error) {

                res.send({
                    error: error
                })
                return
            }

            forecast.forecastD(latitude, longitude, (error, {description, temperature, feelsLike} = {}) => {

                if (error) {
                    res.send({
                        error: error
                    })
                    return
                }

                res.send({
                    searchedAddress: req.query.address,
                    latitude,
                    longitude,
                    placeName,
                    description,
                    temperature,
                    feelsLike
                })
            })
        })
    })

    app.get('/help/*', (req, res) => { // * is the wildcard of express and catches anything passed

        res.render('error404', {
            title: 'Looks like you need help going back to track...(404)',
            message: 'this page does not exist',
            name: 'Marwan'
        })
    })

    app.get('/about/*', (req, res) => { // * is the wildcard of express and catches anything passed

        res.render('error404', {
            title: 'About 404',
            message: 'this page does not exist',
            name: 'Marwan'
        })
    })

    // this get is for 404 error of page not found, it must come at the end of the file because it will catch everything with the *
    // so to avoid that we add our main gets then the 404 get at the end to catch anything else
    app.get('*', (req, res) => { // * is the wildcard of express and catches anything passed

        res.render('error404', {
            title: 'No page, no weather (404)',
            message: 'this page does not exist',
            name: 'Marwan'
        })
    })

    app.listen(3000, () => {

        console.log('Server is up on port 3000')
    })

    //---------------------------------------------------------------------------------------

        // This example has css and html (hbs) edits which are not mandatory to learn in this nodeJs class

    //---------------------------------------------------------------------------------------

    // utils folder was copied to src folder from weather-app folder
    // then npm i requuest was installed to fullfill utils folder requirements

    //---------------------------------------------------------------------------------------

    console.log('------------------------------<')

} // end of current live example check '20'

//---------------------------------------------------------------------------------------

    // Check practice 6-default-params.js in playground for extra info

//---------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------

    // Next example (21) will be in public/js/app.js
    // Note that examples in public/js/app.js are still ran from here in terminal, that file only handles user interface and inputs

//---------------------------------------------------------------------------------------