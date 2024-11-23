const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", async (req, res) => {
    const{username, password} = req.body;

    if(!!!username || !!!password){
        return res.status(400).json(jsonResponse(400,{
            error: "Fiels are required"
        }))
    }

    try{
        const user = new User();
        const exist = await user.usernameExist(username);
    if(exist){
        return res.status(400).json(
            jsonResponse(400,{
                error: 'El usuario ya existe',
            })
        );
    }
        const newUser = new User({username, password});
        await newUser.save()

        res.status(200).json(jsonResponse(200,{message: "Usuario creado exitosamente"}))
        res.send("signout");
    }catch(error){
        res.status(500).json(
            jsonResponse(500, {error: "Error al crear el usuario"})
        )
    }
    
})

module.exports = router;