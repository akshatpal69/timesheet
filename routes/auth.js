const client = require('../database')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const router = express.Router()
// const e = require('express')
// const { promptSimShell } = require('readline-sync')
const KEY = 'randomstring'
//login
router.use(cookieParser());



router.post('/authempl', (req, res) => {
    // check if alreadxy logged in
    if (req.headers.cookie) {
        // verify session
        const collection = client.db("agamitech").collection("session")
        const receivedSEssionID = req.cookies.authCookie
        //extract name from cookie value from receveide session id  | ok
        console.log(receivedSEssionID)
        let verifySession = { sessionid: receivedSEssionID }
        collection.findOne(verifySession, (err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.message })
            }
            if (result) {
                return res.status(200).json({ cookieStatus: 'logged inalredy', })
            } else {
                return res.clearCookie('authCookie').status(400).json({ cookieStatus: 'loggedout' })
            }
        })

    }
    else {
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(400).json({ response: 'empty datafilds' })
        }
        client.connect(err => {

            const collection = client.db("agamitech").collection("empl")
            let authQuery = { _id: name }
            collection.findOne(authQuery, (err, result) => {
                if (err) {
                    console.log(err.code)
                    return res.status(400).json({ err: err.message })
                }
                if (result) {
                    if (result.password == password) {
                        let sessionid = 'empl'+KEY + name
                        //if passwordok > create sessions
                        let createSession = { name, sessionid }
                        client.db("agamitech").collection("session").insertOne(createSession, (err, result) => {
                            if (err) {
                                console.log(err.code)
                                return res.status(400).json({ err: err.message })
                            }
                            return res.cookie('authCookie', sessionid).status(200).json({ cookieStatus: 'logged in', name })
                        })
                    }
                    else {
                        return res.status(400).json({ cookieStatus: 'wrong password' })
                    }
                }
            })
        });
    }
})

router.post('/authmanager', (req, res) => {
    // check if alreadxy logged in
    if (req.headers.cookie) {
        // verify session
        const collection = client.db("agamitech").collection("session")
        const receivedSEssionID = req.cookies.authCookie
        //extract name from cookie value from receveide session id  | ok
        console.log(receivedSEssionID)
        let verifySession = { sessionid: receivedSEssionID }
        collection.findOne(verifySession, (err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.message })
            }
            if (result) {
                return res.status(200).json({ cookieStatus: 'logged inalredy' })
            } else {
                return res.clearCookie('authCookie').status(400).json({ cookieStatus: 'loggedout' })
            }
        })

    }
    else {
        const { name, password } = req.body
        console.log(name, password)
        if (!name || !password) {
            return res.status(400).json({ response: 'empty datafilds' })
        }
        client.connect(err => {
            const collection = client.db("agamitech").collection("manager")
            let authQuery = { _id: name }
            collection.findOne(authQuery, (err, result) => {
                if (err) {
                    console.log(err.code)
                    return res.status(400).json({ err: err.message })
                }
                if (result) {
                    if (result.password == password) {
                        let sessionid ='MGRR'+ KEY + name 
                        //if passwordok > create sessions
                        let createSession = { name, sessionid }
                        client.db("agamitech").collection("session").insertOne(createSession, (err, result) => {
                            if (err) {
                                console.log(err.code)
                                return res.status(400).json({ err: err.message })
                            }
                            return res.cookie('authCookie', sessionid).status(200).json({ cookieStatus: 'logged in', name })
                        })
                    }
                    else {
                        return res.status(400).json({ cookieStatus: 'wrong password' })
                    }
                }
            })
        });
    }
})

router.post('/authadmin', (req, res) => {
    // check if alreadxy logged in
    if (req.headers.cookie) {
        // verify session
        const collection = client.db("agamitech").collection("session")
        const receivedSEssionID = req.cookies.authCookie
        //extract name from cookie value from receveide session id  | ok
        console.log(receivedSEssionID)
        let verifySession = { sessionid: receivedSEssionID }
        collection.findOne(verifySession, (err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.message })
            }
            if (result) {
                return res.status(200).json({ cookieStatus: 'logged inalredy' })
            } else {
                return res.clearCookie('authCookie').status(400).json({ cookieStatus: 'loggedout' })
            }
        })

    }
    else {
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(400).json({ response: 'empty datafilds' })
        }
        client.connect(err => {

            const collection = client.db("agamitech").collection("admin")
            let authQuery = { _id: name }
            collection.findOne(authQuery, (err, result) => {
                if (err) {
                    console.log(err.code)
                    return res.status(400).json({ err: err.message })
                }
                if (result) {
                    if (result.password == password) {
                        let sessionid =  'admin'+KEY + name 
                        //if passwordok > create sessions
                        let createSession = { name, sessionid }
                        client.db("agamitech").collection("session").insertOne(createSession, (err, result) => {
                            if (err) {
                                console.log(err.code)
                                return res.status(400).json({ err: err.message })
                            }
                            return res.cookie('authCookie', sessionid).status(200).json({ cookieStatus: 'logged in', name })
                        })
                    }
                    else {
                        return res.status(400).json({ cookieStatus: 'wrong password' })
                    }
                }
            })
        });
    }
})
// router.


    //logout
    router.get('/logout', (req, res) => {
        return res.clearCookie('authCookie').status(200).json({ response: 'loggedout' })
    })

module.exports = router

