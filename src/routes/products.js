const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const Productos = require('../../ClaseProductos');
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


module.exports = router;
