const client = require('../database')
const express = require('express')
const app = express()
const router = express.Router()

router.post('/givetask', (req, res) => {
    const { name, task } = req.body
    const collection = client.db("agamitech").collection("task");

    let addTask = { _id: name, task }
    collection.insertOne(addTask, (err, result) => {
        if (err) {
            console.log(err.code)
            return res.status(400).json({ err: err.message })
        }
        if (result) {
            return res.status(200).json({ result })
        }
    })
})
router.post('/fetchtask', (req, res) => {
    const { name } = req.body
    console.log(name)
    const collection = client.db("agamitech").collection("task");

    let fetchTask = { _id: name }
    collection.findOne(fetchTask, (err, result) => {
        if (err) {
            console.log(err.code)
            return res.status(400).json({ err: err.message })
        }
        if (result) {
            return res.status(200).json({ task:result.task })
        }
    })
})
module.exports = router
