import express from 'express';
import {engine} from 'express-handlebars';
import productsRouter from './src/routes/products.js';
import Productos from './ClaseProductos.js'
const app = express();
const PORT = 8080;
const producto = new Productos();
//Rutas
// const productsRouter = require('./src/routes/products');
app.use(express.static('public'));
app.use('/api/productos', productsRouter);

app.engine('handlebars',engine());
app.set('views','./src/views');
app.set('view engine','handlebars');

//Indica que debe recibir JSON
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

app.get('/views/products',(req,res)=>{
    producto.getAllProducts()
    .then(result=>{
        let info = result.payload;
        let preparedObject ={
            productos : info
        }
        res.render('products',preparedObject)
    })
})