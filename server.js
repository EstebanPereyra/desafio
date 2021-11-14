const express = require('express');
const app = express();
const PORT = 8080;
const Productos = require('./ClaseProductos');
const producto = new Productos();

//Indica que debe recibir JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

//Rutas
//GET '/api/productos' -> devuelve todos los productos.
app.get('/api/productos', (req, res) => {
    producto.getAllProducts()
    .then(result => {
        res.send(result);
    })
})
//GET '/api/productos/:id' -> devuelve un producto según su id.
app.get('/api/productos/:id', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    producto.getProductsById(id)
        .then(result => {
            res.send(result);
        })
})
//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
app.post('/api/productos', (req, res) => {
    let cuerpo = req.body;
    producto.registerProducts(cuerpo)
        .then(result => {
            res.send(result);
        })
})

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
app.put('/api/productos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let body = req.body;
  producto.updateProduct(id, body)
    .then(result => {
        res.send(result);
    })
})

//DELETE '/api/productos/:id' -> elimina un producto según su id.
app.delete('/api/productos/:id', (req, res) => {
    
})