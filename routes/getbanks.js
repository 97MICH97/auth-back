const router = require("express").Router();
const axios = require('axios');
const { jsonResponse } = require("../lib/jsonResponse");

router.get("/", (req, res) => {
    try {
        let config = {
            method: 'GET',
            url: 'https://sandbox.belvo.com/api/institutions/?page_size=10',
            headers: {
                'accept': 'application/json', 
                'authorization': "Basic NDc4OTEzODMtNjM2OC00MTE3LWE2YjctYzBmYzE4NTQ5YmIwOlJBUVZfY3F1OWdsWFF2ZXh4RzNiTVgyXzlZZFZtQ3J5QjVnR1RWc1NKVmZaYUJEeDhtb3BSQ2psdmstMklydnY="
            }
        };

        data = axios.request(config).
        then((response) => {
            data = res.status(200).json(jsonResponse(200, response.data.results))
            console.log(JSON.stringify(response.data.results));
        })
        return data
    } catch (error) {
        res.status(500).json(
            jsonResponse(500,{error: "errar a traer los bancos"})
        )
    }
})

module.exports = router;