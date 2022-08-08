console.log('--------------- App main file is running (public/js/app.js) ---------------')

console.log('Client side javascript file is loaded!')

// If looking for example 1, go to notes-app folder -> app.js file (Examples 1 - 11)
// If looking for example 12, go to weather-app folder -> app.js file (Examples 12 - 16)
// If looking for example 17, go to web-server folder -> app.js file (Examples 17 - 18)
// If looking for example 19, go to web-server-v2 folder -> src/app.js file (Examples 19 - 20)

const currentLiveExample = 24

if (currentLiveExample === 21) {

    console.log('--------------------------- EXAMPLE 21 --->')

                // Example 21 - files included: app.js & app.js from both src/app.js and public/js/app.js

    // featch func is as same as request except it uses promises (.then) to get fetched data
    fetch('http://puzzle.mead.io/puzzle').then((response) => { // this url fetches a string wiht keyValue of 'puzzle'
        response.json().then((data) => {
            console.log(data)
        })
    })

    console.log('------------------------------<')

} // end of current live example check '21'

//---------------------------------------------------------------------------------------

if (currentLiveExample === 22) {

    console.log('--------------------------- EXAMPLE 22 --->')

                // Example 21 - files included: app.js & app.js from both src/app.js and public/js/app.js

    // note here that we are requesting data from weatherstack or geocode, we are actually fetching it from our own website url
    // another thing to mention, we are not running this file using node or nodemon, it was accessed from src/app.js and these logs are printed out in chrome console
    const url = 'http://localhost:3000/weather?address=Amman'
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

    console.log('------------------------------<')

} // end of current live example check '22'

//---------------------------------------------------------------------------------------

if (currentLiveExample === 23) {

    console.log('--------------------------- EXAMPLE 23 --->')

                // Example 21 - files included: app.js & app.js from both src/app.js and public/js/app.js

    // note here that we are requesting data from weatherstack or geocode, we are actually fetching it from our own website url
    // another thing to mention, we are not running this file using node or nodemon, it was accessed from src/app.js and these logs are printed out in chrome console
    const url = 'http://localhost:3000/weather?address=Amman'
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

    // form takes a query from the website, it could be scroll, search, button and more
    // in our case we want to lister for the search button beside the search under the keyValue 'submit'
    const weatherForm = document.querySelector('form')

    const search = document.querySelector('input') // this gains access to search in the browser to allow us getting the input value after submitting

    weatherForm.addEventListener('submit', (event) => { // event or e
        event.preventDefault() // this prevent the the default behavior which is reload the browser

        const location = search.value // value entered by user
    })

    console.log('------------------------------<')

} // end of current live example check '23'

//---------------------------------------------------------------------------------------

if (currentLiveExample === 24) {

    console.log('--------------------------- EXAMPLE 24 --->')

                // Example 24 - files included: app.js & app.js from both src/app.js and public/js/app.js

    
    const weatherForm = document.querySelector('form')
    const search = document.querySelector('input')

    const messageOne = document.querySelector('#message-1') // using the # allows you to access an html element by id
                                                            // here we want to access <p> element in index.hbs with id message-1 and message-2
    const messageTwo = document.querySelector('#message-2')

    messageOne.textContent = ''
    messageTwo.textContent = ''

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value

        // clearing things out, ap.js in src takes the query from the url itself
        // while in here we take the input from search add it to the url quesry that app.js in src is going to read
        // after that data returned from src app.js is handled here once again to be shown to user
        // search input -> add to url query then fetch -> get response from request -> handle response

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = '' // clear after each search submit

        // * note here we removed our local host url, and that's in order to make it up and running on any port either Heroku or local
        const url = '/weather?address=' + location
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    messageOne.textContent = ''
                    messageTwo.textContent = data.error
                } else {
                    console.log(data.location)
                    console.log(data.forecast)
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })

    console.log('------------------------------<')

} // end of current live example check '24'