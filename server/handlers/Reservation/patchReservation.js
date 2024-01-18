"use strict";

//This will update an existing reservation (limited to seating only)
const patchReservation = async(req, res) => {

    const { resId } = req.params;
    const patchData = req.body;

    console.log(patchData)
    console.log(resId)

    // Rid of empty strings or spaces
    Object.keys(patchData).forEach(key => {
        if (typeof patchData[key] === 'string' && patchData[key].trim() === ''){
            delete patchData[key]
        }
    });

    // Case: Nothing to be changed 
    if (!Object.keys(patchData).length) {
        res.status(204).json({
            status: 204,
            message: "No reservation data to modify"
        })
        return;
    }

    // if date is passed only, we need to check current location & thus
    // we need to .get the reservation details. This will give use our location
    // and previous date. We will release the seat from the previous date and grab the new one. 

    // if only location is passed we need to check the new location for space 
    // and need to retrieve old res to get the date. We will
    // also use the old location and date to release the "seat"

    // this means that both need to retrieve data by resId
    // once that is done, we will have oldResData and patchData

    // we will have to raise an error if old reservation cannot be found then
    // continue the bulk of the program as an else

    // Once we have the data we release the old seats, if that doesn't work
    // we raise error status code. 
    // If it works, we continue to booking new spots.
    // if that doesn't work, we raise error. 
    // if that works, we update the reservation in MongoDB
    // if updates don't go through, error
    // if it works, success. 





    // then I need to compare what has changed from previous booking 

    // issue here is that I can change just the location 
    // if so, I need to just check if the new time is available. if so, 
    // then grab it and let other availability go




};

module.exports = patchReservation;