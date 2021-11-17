const express = require('express');
const app = express();
const PORT = 8080;
const Productos = require('./ClaseProductos');
const producto = new Productos();
//Rutas
const productsRouter = require('./src/routes/products');
app.use('/api/productos', productsRouter);

//Indica que debe recibir JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})
