const { response } = require("express")
const jtw =require('jsonwebtoken')

const validarJwt=(req,res=response,next)=>{

const token=req.header('x-token')

   

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'No se encuentra el token'
        });    
    }
    try {
        const {uid,name}=jtw.verify(
            token,
            process.env.Clave_Tu
        )
       req.uid=uid;
       req.name=name;

        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
    }



    next();
}

module.exports={
    validarJwt
}