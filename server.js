import express from 'express';
import {engine} from 'express-handlebars';
import productsRouter from './src/routes/products.js';
import Productos from './ClaseProductos.js';
const app = express();
import {Server} from 'socket.io';
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

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

export const io = new Server(server);

io.on('connection', async socket => {
    console.log('Cliente conectado');
    let products = await producto.getAllProducts();
    socket.emit('updateProducts', products);
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