const express = require("express");
const app = express();

// Requireds so that we canb parse the cookie
const cookieParser = require("cookie-parser")
app.use(cookieParser());


// Middleware demo to test if cookie is valid
const isAuth = (req, res, next) => {

    // check cookie exists
    if (req.cookies.cookie1 == null)
        return res.send("not authenticated, missing cookie1")
    if (req.cookies.cookie2 == null)
        return res.send("not authenticated, missing cookie2")
    if (req.cookies.cookie3 == null)
        return res.send("not authenticated , missing cookie3")

    if (req.cookies.cookie1 != "one")
        return res.send("cookie1 has wrong value")
    if (req.cookies.cookie1 != "two")
        return res.send("cookie2 has wrong value")
    if (req.cookies.cookie1 != "three")
        return res.send("cookie2 has wrong value")

    // cookie exists
    console.log("Cookie1: " + req.cookies.cookie1)
    console.log("Cookie2: " + req.cookies.cookie2)
    console.log("Cookie3: " + req.cookies.cookie3)
  
    next();
}

// Routes
// Set cookie (login)
app.get('/set-cookie', async (req, res) => { 

    // constions for the cookie
    const cookieOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 5000 // 5 seconds
    }

    res.cookie('cookie1', "one", cookieOptions)
    res.cookie('cookie2', "two", cookieOptions)
    res.cookie('cookie3', "three", cookieOptions)
    res.send('cookies set')
})

// set cookie as wrong value
app.get('/set-cookie-wrong', async (req, res) => { 

    const cookieOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 10000
    }

    res.cookie('cookie1', "oneWrong", cookieOptions)
    res.cookie('cookie2', "twoWrong", cookieOptions)
    res.cookie('cookie3', "threeWrong", cookieOptions)
    res.send('cookies set')
})

// get list of all cookies
app.get('/get-cookie', (req, res) => { 

    if (!req.headers.cookie) {
        return res.send("no cookie || cookie expired")
    }

    // Totaly stole this bit of code from:
    // https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
    // splity all existing cookies into a list
    const list = {}
    const cookieHeader = req.headers?.cookie;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return res.json({message: "a list of cookies", list: list})

})

// simulate using cookie to check if authencitated
app.get('/test-cookie', isAuth, (req, res) => { 

    res.send("Authenticated, continute...")

})


// clear cookie
app.get('/clear-cookie', (req, res) => { 

    res.clearCookie("cookie1")
    res.clearCookie("cookie2")
    res.clearCookie("cookie3")
    res.send("Cookies cleared")
})


// error 404 (put and end)
app.get('*', (req, res) => { 

    res.send("404 not found")

})


// Start
app.listen(3000, function() {
    console.log("Listening...");
});
