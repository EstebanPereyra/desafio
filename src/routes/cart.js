import express from 'express';
const router = express.Router();
import cors from 'cors';
import multer from 'multer';
import {Cart} from '../../ClaseCart.js'; 
import {io} from '../../server.js'
const producto = new Cart();


//Indica que debe recibir JSON
router.use(express.json());
router.use(express.urlencoded({extended:true}));

//MULTER 

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'public')
    },
    filename: function(req, res, cb) {
        cb(null,Date.now()+file.originalname)
    }
})

const upload = multer({storage:storage});
router.use(upload.single('file'));

//CORS
router.use(cors());

//POST: '/' - Crea un carrito y devuelve su id.
router.post('/', (req, res) => {
    let cuerpo = req.body;
    console.log(cuerpo);
    producto.registerProducts(cuerpo)
        .then(result => {
            res.send(result);
        })
})
//DELETE: '/:id' - Vacía un carrito y lo elimina.
router.delete('/', (req, res) => {
    producto.deleteAllProduct()
        .then(result=> {
            res.send(result);
        })
})
//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    producto.getAllProducts()
        .then(result => {
            res.send(result);
        })
})
//POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
router.post('/:id/productos', (req, res) => {
    let cuerpo = req.body;
    console.log(cuerpo);
    producto.registerProducts(cuerpo)
        .then(result => {
            res.send(result);
            if(result.status==='success') {
                producto.getAllProducts()
                .then(result => {
                    io.emit('updateProducts',result);
                })
            }
        })
})
//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto


router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    producto.deleteProduct(id)
        .then(result=> {
            res.send(result);
        })
})


export default router;
