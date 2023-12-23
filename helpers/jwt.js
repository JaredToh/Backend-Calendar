const jtw =require('jsonwebtoken')

const generarJTW=(uid,name)=>{

    return new Promise((resolve,reject)=>{
        const payload={uid,name};

        jtw.sign(payload,process.env.Clave_Tu,{
            expiresIn: '2h'
        },(err,token)=>{

            if(err){
                console.log(err);
                reject('no se pudo generar el token')
            }
            resolve(token);
        })
    })
}

module.exports=generarJTW;