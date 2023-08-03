const express = require('express')
const router = express.Router();



//this is out endpoint for front end, this code shall be shown on the front end taken frm the back
router.post('/foodData', (req, res) => {
    try {
        res.send([global.food_items, global.food_items_Categories])
    } catch (error) {
        console.error(error.message);
        res.send("server error")
    }
})

module.exports = router;