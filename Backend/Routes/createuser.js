const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const jwtsecret = "RANDOMSTRINGTOLENGHTENTHEPASSWORDENCRYPTION"

//this will become our endpoint when the user is prompted to give in the details of his credentials
//this is coming from app.use in the index.js.
router.post("/createuser",
    // username must be an email
    [body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Incorrect password').isLength({ min: 5 }),  //here Incorrect Password is used to display if 
    body('name').isLength({ min: 5 })]                            //length is not 5 or more
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(15)
        var secPassword = await bcrypt.hash(req.body.password, salt)
        try {

            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
            })
            //thunder client works as our front end here which sends data by posing as a legitimate user
            //and gives in the credentials.
            //we use POST method of express here.
            //we used thunder client to input data from the backend itself.
            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })

        }
    })

router.post("/loginuser", [body('email').isEmail(),
body('password', 'Incorrect password').isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne(              //here there are various ways too validate the existing data, 
            //but we use find one, through email, there are many and we can 
            //find and updatae or remove or add data too!
            {email}
            //findOne will find the parenthesised data and then return the whole document to the owner.
            
        );
        if (!userData) { //no response fetched
            return res.status(400).json({ errors: "incorrect credentials try again" })
        }

        const pwdcompare = await bcrypt.compare(req.body.password,userData.password) //for extra security
        if (!pwdcompare) {
            return res.status(400).json({ errors: "incorrect pw try again" })
        }
        const data={                    //this data has to object for signing for auth
            user:{
                id:userData.id
            }
        }
        const authtoken = jwt.sign(data,jwtsecret)
        
        return res.json({ success: true , authtoken: authtoken})   //auth token will be sent along with the success:true
    } catch (error) {                                               //stored in the frontend in local storage
        console.log(error);
        res.json({ success: false })

    }
})

module.exports = router;