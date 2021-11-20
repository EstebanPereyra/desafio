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

//MOTORES DE PLANTILLA
app.set('views','./src/views');
app.set('view engine','handlebars'); //PARA UTILIZAR HANDLEBARS

//PUG
// app.set('views','./src/views/expressPUG');
// app.set('view engine','pug'); //PARA UTILIZAR PUG

//Indica que debe recibir JSON
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

//EJS
// app.set('views','./src/views/expressEJS');
// app.set('view engine','ejs');


const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

//HANDLEBARS
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

//PUG

app.get('/views/productspug',(req,res)=>{
    producto.getAllProducts()
    .then(result=>{
        let info = result.payload;
        let preparedObject ={
            productos : info
        }
        res.render('productspug',preparedObject)
    })
})

//EJS

app.get('/views/productsejs',(req,res)=>{
    producto.getAllProducts()
    .then(result=>{
        let info = result.payload;
        let preparedObject ={
            productos : info
        }
        res.render('productsejs',preparedObject)
    })
})