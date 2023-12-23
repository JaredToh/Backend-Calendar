const { Router } = require("express");
const router=Router();
const {getEvents,crearEvent,actualizarEvent,deleteEvent}=require('../controllers/events');
const { validarJwt } = require("../middlewares/validar-jtw");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {isDate} = require("../helpers/isDate");

// Todas tienes que pasar por la validación del JWT
router.use( validarJwt );

 router.get('/',getEvents);

 router.post('/',
 [ 
    check('title','el title es obligatorio').not().isEmpty(),
    check('start','la fecha de inicio es obligatoria').custom(isDate),
    check('end','la fecha end es obligatoria').custom(isDate),
    validarCampos

  ]
 ,crearEvent);

 router.put('/:id' ,
[
  check('title','el title es obligatorio').not().isEmpty(),
    check('start','la fecha de inicio es obligatoria').custom(isDate),
    check('end','la fecha end es obligatoria').custom(isDate),
    validarCampos
 ],actualizarEvent)

 router.delete('/:id',deleteEvent);

 module.exports=router;
