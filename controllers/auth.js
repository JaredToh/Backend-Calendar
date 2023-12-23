const { validationResult } = require("express-validator");
const Usuario = require('../models/Usuario');
const { response } = require("express");
const bcrypt=require("bcryptjs")
const generarJTW=require('../helpers/jwt')

const createUser = async (req, res = response) => {

    const {email,password}=req.body;

    try {
        let usuario=await Usuario.findOne({email});

            if(usuario){
                return res.status(400).json({
                    ok:false,
                    msg:'Este usuario ya existe'
                })
            }
         usuario = new Usuario(req.body);

         //incriptar contraseña
         const salt=bcrypt.genSaltSync();
         usuario.password=bcrypt.hashSync(password,salt);

        await usuario.save();

        const token=await generarJTW(usuario.id,usuario.name)
        
        res.status(201).json({
            ok:true,
            uId:usuario.id,
            name:usuario.name,
            token
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error: error.message // Envía el mensaje de error para propósitos de depuración
        });
    }
};

const logger = async(req, res) => {
    const {email,password}=req.body;

    try {
        let usuario=await Usuario.findOne({email});

            if(!usuario){
                return res.status(400).json({
                    ok:false,
                    msg:'email incorrecto'
                })
            }
          

         //compara las contraseñas
            const validPassword=bcrypt.compareSync(password,usuario.password);

            if(!validPassword){
                return res.status(400).json({
                    ok:false,
                    msg:'contraseña incorrecta'
                });
            }

            const token=await generarJTW(usuario.id,usuario.name)
        
        res.status(201).json({
            ok:true,
            uId:usuario.id,
            name:usuario.name,
            token
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error: error.message // Envía el mensaje de error para propósitos de depuración
        });
    }
};



const renew =async (req, res) => {
   const uid=req.uid;
   const name=req.name;
   
   
   const token=await generarJTW(uid,name)

    res.json({
        ok: true,
        token
    });
};

module.exports = {
    createUser,
    logger,
    renew
};
