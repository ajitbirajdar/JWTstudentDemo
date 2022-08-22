const connection =require('../connection/mysql.connection');
const bcrypt=require('bcrypt');
module.exports ={

    getAll:(req,res)=>{

       let id= req.user.StudID;
     connection.query(`select StudID, Name, Email, Mobile, profileUrl, Age  from student where StudID=${id}`,(err, result)=>{
         if(err){
             res.send({error:true, message:err.message})
         }else{
            res.send({error:false, data:result})
         }
     })
    },
    createUser:(req,res)=>{
        let salt=bcrypt.genSaltSync(10);
        let hashPassword=bcrypt.hashSync(req.body.Password,salt);

        connection.query(`INSERT INTO student(StudID, Name, Email, Mobile, profileUrl, Age, password) VALUES (0,'${req.body.Name}','${req.body.Email}','${req.body.Mobile}','${req.body.ProfileUrl}',${req.body.Age},'${hashPassword}')`,(err, result)=>{
            if(err){
                res.send({error:true, message:err.message})
            }else{
               if(result.affectedRows>0){
                res.send({error:false, message:"New User created with Id "+result.insertId})
               }else{
                res.send({error:false, message:"New User not created"})
               }
              
            }
        })
    }
  
}