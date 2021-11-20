import express from 'express';
const router = express.Router();
import cors from 'cors';
import multer from 'multer';
import {Productos} from '../../ClaseProductos.js'; 
const producto = new Productos();


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


//GET

router.get('/', (req, res) => {  
    producto.getAllProducts()
    .then(result => {
        res.send(result);
    })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    producto.getProductsById(id)
        .then(result => {
            res.send(result);
        })
})

//POST

router.post('/', (req, res) => {
    let cuerpo = req.body;
    console.log(cuerpo);
    producto.registerProducts(cuerpo)
        .then(result => {
            res.send(result);
        })
})

//PUT

router.put('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let body = req.body;
    producto.updateProduct(id, body)
      .then(result => {
          res.send(result);
      })
})

//DELETE 
router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    producto.deleteProduct(id)
        .then(result=> {
            res.send(result);
        })
})


export default router;
