const Mongoose = require("mongoose");

const UserSchemaSaveData = new Mongoose.Schema({
    id: {type: Object},
    data: {type: Object, required :true}
});

module.exports = Mongoose.model("SaveLinks", UserSchemaSaveData)


