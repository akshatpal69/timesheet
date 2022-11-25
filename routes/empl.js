const client = require('../database')
// const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()
const router = express.Router()
//create employee||manager



router.post('/createempl', (req, res) => {
    client.connect(err => {
        const { name, password, role, repMan } = req.body
        if (!name || !password || !role) {
            return res.status(400).json({ response: 'empty datafilds' })
        }
        const collection = client.db("agamitech").collection("empl");
        let testInsertQuery = { _id: name, password, role, repMan }
        // perform actions on the collection object
        collection.insertOne(testInsertQuery, (err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.message })
            }
            if (result) {
                return res.status(200).json({ result })

            }
        })
    });
})

router.post('/createmanager', (req, res) => {
    client.connect(err => {
        const { name, password, role, repMan } = req.body
        if (!name || !password || !role) {
            return res.status(400).json({ response: 'empty datafilds' })
        }
        const collection = client.db("agamitech").collection("manager");
        let testInsertQuery = { _id: name, password, role, repMan }
        // perform actions on the collection object
        collection.insertOne(testInsertQuery, (err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.message })
            }
            if (result) {
                return res.status(200).json({ result })

            }
        })
    });
})

router.post('/getempl', (req, res) => {
    client.connect(err => {
        // return res.status(400).json({ err: err.message })
        const { name } = req.body
        if (!name) {
            return res.status(400).json({ response: 'empty datafilds' })
        }
        const collection = client.db("agamitech").collection("empl");
        // { $where:
        // {"books" : {$size : {$gt : 1}}}
        let getEmpl = { _id: name }//, $where: { 'repMan': repMan } }
        // perform actions on the collection object
        collection.findOne(getEmpl, (err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.message })
            }
            if (result) {
                return res.status(200).json({ name: result._id, password: result.password, role: result.role, repMan: result.repMan })
            }
            else {
                return res.status(200).json({ response: 'user doesnt exist' })

            }
        })
    });
})

router.get('/getall', (req, res) => {
    client.connect(err => {
        // return res.status(400).json({ err: err.message })
        let allAdmin = allManager = allEMpl = ''
        const manager = client.db("agamitech").collection("manager");
        const admin = client.db("agamitech").collection("admin");
        const empl = client.db("agamitech").collection("empl");
        // let getEmpl = { _id: name }
        // perform actions on the collection object
        manager.find().toArray((err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.message })
            }
            if (result) {
                allManager = result
                admin.find().toArray((err, result) => {
                    if (err) {
                        console.log(err.code)
                        return res.status(400).json({ err: err.message })
                    }
                    if (result) {
                        allAdmin = result
                        empl.find().toArray((err, result) => {
                            if (err) {
                                console.log(err.code)
                                return res.status(400).json({ err: err.message })
                            }
                            if (result) {
                                allEMpl = result
                                return res.status(200).json({ allAdmin, allManager, allEMpl })


                            }
                            else {
                                return res.status(200).json({ response: 'user doesnt exist' })

                            }
                        })

                    }
                    else {
                        return res.status(200).json({ response: 'user doesnt exist' })

                    }
                })
            }
            else {
                return res.status(200).json({ response: 'user doesnt exist' })

            }
        })





    });
})

router.post('/rateempl', (req, res) => {
    const { name, rating } = req.body

    console.log(name, rating)
    const collection = client.db("agamitech").collection("rating");

    let addRating = { _id: name, rating }
    collection.insertOne(addRating, (err, result) => {
        if (err) {
            console.log(err.code)
            return res.status(400).json({ err: err.message })
        }
        if (result) {
            return res.status(200).json({ response: rating, name })
        }
    })
})
router.post('/getrating', (req, res) => {
    const { name } = req.body

    console.log(name)
    const collection = client.db("agamitech").collection("rating");

    let getRating = { _id: name }
    collection.findOne(getRating, (err, result) => {
        if (err) {
            console.log(err.code)
            return res.status(400).json({ err: err.message })
        }
        if (result) {
            console.log('result')
            return res.status(200).json({ response:result.rating  })
        }
    })
})
router.get('/getemplall', (req, res) => {
    client.connect(err => {
        // return res.status(400).json({ err: err.message })

        const collection = client.db("agamitech").collection("empl");

        collection.find().toArray((err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.message })
            }
            if (result) {
                return res.status(200).json({ result })
            }
        })
    })
})




module.exports = router