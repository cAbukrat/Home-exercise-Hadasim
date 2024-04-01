const express = require('express')
const coronaBL = require('../BL/coronaBL')

const router = express.Router()

//Get the number of active patients for each day of the last month
router.route('/').get(async(req,res) => {

        const result = await coronaBL.getActivePatients()
        res.json(result)
})


//Get Vaccination Statistics
router.route('/vaccineStats').get(async(req,res) => {
    try {
        const vaccineStats = await coronaBL.getVaccineStats()
        res.json(vaccineStats)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router