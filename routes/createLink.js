const router = require("express").Router();
const  Mongoose  = require("mongoose");
const axios = require('axios');
const { jsonResponse } = require("../lib/jsonResponse");
const SaveData = require("../schema/saveLink");

router.post("/", async (req, res) => {
    const{institution,username} = req.body;
    const result = await Mongoose.model("User").findOne({username});
    try {
        
        let data = JSON.stringify({
            "institution": institution,
            "username": '12345',
            "password" : result.password,
            "access_mode" : "single"
        });
        let config = {
            method: 'POST',
            headers: {
                'accept': 'application/json', 
                'authorization': 'Basic NDc4OTEzODMtNjM2OC00MTE3LWE2YjctYzBmYzE4NTQ5YmIwOlJBUVZfY3F1OWdsWFF2ZXh4RzNiTVgyXzlZZFZtQ3J5QjVnR1RWc1NKVmZaYUJEeDhtb3BSQ2psdmstMklydnY=',
                'content-type': 'application/json',
            },
            url: 'https://sandbox.belvo.com/api/links/',
            data:data
        };

        const response = await axios.request(config).
        then(async response => {
            return res.json(response.data)
        }).catch(err => {
            return res.json({
                message: err.message || "some error ocurred"
            })
        })
        cosole.log('antes de guardar')
        await new SaveData({data: response.data}).save();
        cosole.log('despues de guardar')
        return {"message" : "Link created successfully"}
    } catch (error) {
        res.json(
            jsonResponse(500,{error: "error a crear el link"})
        )
    }
})

module.exports = router;