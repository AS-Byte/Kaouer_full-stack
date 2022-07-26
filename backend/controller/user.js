const User = require("../models/User");

const countUser=async()=>{
    await  User.count({role:'user'})
    .then((user) => res.json({user}))
    .catch((err) => res.send(err));
}

module.exports={countUser};
