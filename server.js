import express from 'express';
import {engine} from 'express-handlebars';
import productsRouter from './src/routes/products.js';
import Productos from './ClaseProductos.js';
import Chat from './ClaseChat.js';
const app = express();
import {Server} from 'socket.io';
const PORT = 8080;
const producto = new Productos();
const chat = new Chat();
//Rutas
// const productsRouter = require('./src/routes/products');
app.use(express.static('public'));
app.use('/api/productos', productsRouter);

app.engine('handlebars',engine());

//MOTORES DE PLANTILLAN
app.set('views','./src/views');
app.set('view engine','handlebars'); //PARA UTILIZAR HANDLEBARS

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

export const io = new Server(server);
let messages = [];



io.on('connection', async socket => {
    console.log('Cliente conectado');
    let products = await producto.getAllProducts();
    socket.emit('updateProducts', products);
    
    
    socket.emit('messagelog', messages);
    socket.on('message', (data) => {
        chat.registerChat(data); //Guardar chat en .txt
        messages.push(data)
        io.emit('messagelog', messages);
        
    })
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