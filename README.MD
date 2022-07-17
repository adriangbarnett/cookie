# ABOUT
Simple demo how to set, get and clear cookies

# SETUP
npm init -y
npm i express cookie-parser

# REUQESTS

## Set a cookie:   
    Sets somes cookies
    GET http://localhost:3000/set-cookie

## Set a cookie with wrong value:   
    Sets somes cookies but with the wrong value
    So that when we test the cookie, it will fail
    GET http://localhost:3000/set-cookie-wrong

## Get cookies:
    Get list of all cookies
    GET http://localhost:3000/get-cookie

## Test cookie:
    Check if cookies are set and they contain the desired text value
    GET http://localhost:3000/test-cookie

## Clear Cookie:
    Clear the cookies that we set
    GET http://localhost:3000/clear-cookie

# RUN
npm run dev
nodemon ./app.js localhost