/*
    Rutas de usuario
    hosy+/api/auth
*/
const {Router}=require('express')
const router=Router();
const {check}=require('express-validator')

const {createUser,logger,renew}=require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jtw');

router.post('/new',
[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    check('password','el password es obligatorio').isLength({min:6})


],validarCampos,
 createUser);

router.post('/',
[
    check('email','el email es obligatorio').isEmail(),
    check('password','el password es obligatorio').isLength({min:6})
]
,validarCampos,
 logger);

router.get('/renew', validarJwt,renew);


module.exports=router;