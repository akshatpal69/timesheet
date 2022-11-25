const client = require('../database')
const express = require('express')
const app = express()
const router = express.Router()
//submit timesheet data
router.post('/enterTime', (req, res) => {
    const { name, date, hours, description, remarks } = req.body
    client.connect(err => {
        if (!name || !date || !hours || !description) {
            return res.status(400).json({ response: 'empty datafilds 10' })
        }
        const collection = client.db("agamitech").collection("timesheet")
        let insertTimesheetQuery = { name, date, hours, description, remarks }
        // perform actions on the collection object
        collection.insertOne(insertTimesheetQuery, (err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(400).json({ err: err.code })
            }
            if (result) {
                return res.status(200).json({ result })

            }
        })
    });
})

// router.post('/edittime', (req, res) => {
//     client.connect(err => {
//         const { name, date, hours, description, remarks, } = req.body
//         if(!name){
//             return res.status(400).json({ err: 'must provide name' })

//         }
//         if (date) {
//             const collection = client.db("agamitech").collection("timesheet")
//             // let editTimesheetQuery =  ({name}, {date} )
//         //    let editTimesheetQuery = { name },{ $set: { "date": } }
//                     //  { "name" : "Central Perk Cafe" },{ $set: { "violations" : 3 } }
//             // perform actions on the collection object
//             collection.updateOne(editTimesheetQuery, (err, result) => {
//                 if (err) {
//                     console.log(err.code)
//                     return res.status(400).json({ err: err.message })
//                 }
//                 if (result) {
//                     return res.status(200).json({ result })

//                 }
//             })
//         }
//         if (hours) {
//             const collection = client.db("agamitech").collection("timesheet")
//             let editTimesheetQuery = { hours, }
//             // perform actions on the collection object
//             collection.updateOne(editTimesheetQuery, (err, result) => {
//                 if (err) {
//                     console.log(err.code)
//                     return res.status(400).json({ err: err.message })
//                 }
//                 if (result) {
//                     return res.status(200).json({ result })

//                 }
//             })
//         }
//         if (description) {
//             const collection = client.db("agamitech").collection("timesheet")
//             let editTimesheetQuery = { description }
//             // perform actions on the collection object
//             collection.updateOne(editTimesheetQuery, (err, result) => {
//                 if (err) {
//                     console.log(err.code)
//                     return res.status(400).json({ err: err.message })
//                 }
//                 if (result) {
//                     return res.status(200).json({ result })

//                 }
//             })
//         }
//         if (remarks) {
//             const collection = client.db("agamitech").collection("timesheet")
//             let editTimesheetQuery = {  remarks }
//             // perform actions on the collection object
//             collection.updateOne(editTimesheetQuery, (err, result) => {
//                 if (err) {
//                     console.log(err.code)
//                     return res.status(400).json({ err: err.message })
//                 }
//                 if (result) {
//                     return res.status(200).json({ result })

//                 }
//             })
//         }


//     });
// })



router.post('/gettimesheet', (req, res) => {
    client.connect(err => {
        const { name, } = req.body
        // console.log(repMan)
        if (!name) {
            return res.status(400).json({ response: 'empty datafilds' })
        }
        const collection = client.db("agamitech").collection("timesheet")

        let findEmplQuery = { name}//,  }
        // let findEmplQuery = { name }
        // perform actions on the collection object
        collection.findOne(findEmplQuery, (err, result) => {
            if (err) {
                console.log(err.code)
                return res.status(500).json({ err: err.message })
            }
            if (result) {
                console.log(result)

                return res.status(200).json({ result })

            }
        })
    });
})





module.exports = router