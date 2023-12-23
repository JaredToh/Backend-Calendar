const { response } = require("express");
const Events=require('../models/Events')


const getEvents=async(req,res=response)=>{
    const eventos= await Events.find().populate('user','name')

   res.json({
        ok:true,
        msg:'getEvents',
        eventos

    })
}
const crearEvent=async(req,res=response)=>{

// console.log(req.body);
const evento=new Events(req.body);

try {
  
     evento.user=req.uid;
     const eventoGuarado=await evento.save();

    res.json({
        ok:true,
         evento:eventoGuarado
    })


} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:"hable con el admin"
    })
}

 }
 const actualizarEvent= async(req,res=response)=>{

    const eventoid=req.params.id;
    const uid=req.uid;
    try {
        const evento=await Events.findById(eventoid);
        if(!evento){
            res.status(404).json({
                ok:false,
                msg:"No existe el evento"
                
            })
        }
        if(evento.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                msg:'no tiene privilegios de editar este envento'
            })
        }
        const nuevoEvento={
            ...req.body,
            user:uid
        }

        const eventoActualizado=await Events.findByIdAndUpdate(eventoid,nuevoEvento,{new:true})

        res.json({
            ok:true,
            evento:eventoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"hable con el admin"
        })
    }
 }
 const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const userId = req.uid;

    try {
        const evento = await Events.findById(eventId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el evento"
            });
        }

        if (evento.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        }

        // Si se ha verificado que el usuario tiene permisos para eliminar el evento,
        // aquí es donde se realizaría la lógica para eliminar el evento de la base de datos.
        
         await Events.findByIdAndDelete(eventId);

        res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        });
    }
};

 module.exports={
    getEvents,
    crearEvent,
    actualizarEvent,
    deleteEvent
 }