const addStaff = require('../database/model/addStaff');

module.exports = (req, res)=>{
    
    addStaff.create(req.body, (error, addStaff)=>{
  if (error){
   return res.redirect('/auth/addStaff')
  }
  res.redirect('/')
    }
    )
}
