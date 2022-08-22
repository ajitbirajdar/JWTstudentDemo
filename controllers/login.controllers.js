const connection = require('../connection/mysql.connection');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

module.exports = {
    loginAuth: (req, res) => {

        let userName = req.body.userName;
        let Password = req.body.Password;

        connection.query(`select * from student where Email='${userName}'`, (err, result) => {
            if (err) {
                res.send(err.message)
            } else {
                let isSame = bcrypt.compareSync(Password, result[0].password);
                if(isSame){

                  let token=jwt.sign({StudID: result[0].StudID,Name: result[0].Name},'secretKey',{expiresIn:'1h'})
                   
                  res.send({error:false, message:"User LogedIN ",token:token});
                }else{
                    res.send({error:true, message:"User LogedIN failed"});
                }

            }
        })
    }
}

