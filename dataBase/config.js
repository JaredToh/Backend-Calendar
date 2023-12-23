const mongoose = require('mongoose');


const coneccion=async()=>{

    try {
        
      await  mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
           
        });
        console.log('db online');

    } catch (error) {

        console.log(error);
    
    }
}

module.exports={
    coneccion
}