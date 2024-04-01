const memberModel = require('../models/memberModel')
const moment = require('moment')

//Retrieves active patients counts for each day in the last month.
const getActivePatients = async () => {
    const allMembers = await memberModel.find();

    const today = moment();
    const lastMonth = moment(today).subtract(1, 'month');
    const activePatientsCounts = {};

    //Initialize the activePatientsCounts object
    for (let i = 1; i <= lastMonth.daysInMonth(); i++) {
        const currentDate = moment(lastMonth).date(i).format('YYYY-MM-DD');
        activePatientsCounts[currentDate] = 0;
    }

    allMembers.forEach(member => {
        if (member.sickInCorona.isPositive) {
            const startDate = moment(member.sickInCorona.startDate);
            const endDate = moment(member.sickInCorona.endDate || today);

            // Check if the member was sick within the last month
            if (endDate.isBetween(lastMonth, today, null, '[]')) {
                const startDay = startDate.date();
                const endDay = endDate.date();

                // Update the active patients count for each day the member was sick
                for (let i = startDay; i <= endDay; i++) {
                    const currentDate = moment(startDate).date(i).format('YYYY-MM-DD');
                    activePatientsCounts[currentDate]++; 
                }
            }
        }
    });

    return (activePatientsCounts);
}

//Retrieves vaccination statistics
const getVaccineStats = async () => {

     // Count the number of unvaccinated members
    const unvaccinatedMembers = await memberModel.countDocuments({
        'coronaVaccines.date1': { $eq: null },
        'coronaVaccines.date2': { $eq: null },
        'coronaVaccines.date3': { $eq: null },
        'coronaVaccines.date4': { $eq: null }
    });

    const vaccinatedCounts = {};

    //Count the number of vaccinated members on each date
    for (let i = 1; i <= 4; i++) {
        const fieldName = 'coronaVaccines.date' + i;
        const vaccineCount = await memberModel.countDocuments({ [fieldName]: { $ne: null } });
        vaccinatedCounts[fieldName] = vaccineCount;
    }
    return { unvaccinatedMembers, vaccinatedCounts };
}

module.exports = { getVaccineStats, getActivePatients };