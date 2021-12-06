//--------------------EVENTOS DE SOCKET--------------------------------
const socket = io();

//---------------------CARGA PRODUCTOS EN TIEMPO REAL--------------------------------

socket.on('updateProducts', data => {
    let products = data.payload;
    console.log(products)
    fetch('templates/productsTable.handlebars')
    .then(string => string.text())
    .then(template => {
        const processedTemplate = Handlebars.compile(template);
        const templateObject = {
            products : products
        }
        const html = processedTemplate(templateObject);
        let div = document.querySelector('#productsTable');
        div.innerHTML=html;
    })
})

//---------------------CHAT--------------------------------

const message = document.querySelector('#message');
const email = document.querySelector('#email');

message.addEventListener('keyup', (e) => {
    if(e.key === "Enter") {
        if(email.value !== "") {
        socket.emit('message', {user: email.value, message: e.target.value});
    }
    }
})

const p = document.querySelector('#log');
const day = new Date();
socket.on('messagelog', data => {
    let mensajes = data.map(message => {
        return `<div>
            <span class="usuario">${message.user}</span>
            <span class="dia">[${day}]</span> dice: <span class="mensaje">${message.message}</span>
            </div>`
    }).join('');
    p.innerHTML= mensajes;
})

//--------------------- FIN SOCKET -------------------------------------

//Cargar nuevos productos con formulario

document.addEventListener('submit', event => {
    event.preventDefault();
    let form = document.querySelector('#form');
    let data = new FormData(form);
    fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        body: data
    })
    .then(result => {
        return result.json();
    })
    .then(json => {
        console.log(json);
    })

})
//Actualizar productos con formulario
let btnActualizar = document.querySelector('#btnActualizar');


btnActualizar.addEventListener('click', event => {
    event.preventDefault();
    let form = document.querySelector('#form');
    let data = new FormData(form);
    let id = document.querySelector('#id').value;
    console.log(data)
    fetch(`http://localhost:8080/api/productos/${id}`, {
        method: 'PUT',
        body: data
    })
    .then(result => {
        return result.json();
    })
    .then(json => {
        console.log(json);
    })

})

//Eliminar productos con formulario

let btnBorrar = document.querySelector('#btnBorrar');
let formBorrar = document.querySelector('#form__borrar');

btnBorrar.addEventListener('click', event => {
    event.preventDefault();
    let form = document.querySelector('#form__borrar');
    let data = new FormData(form);
    let id = document.querySelector('#id__borrar').value;
    fetch(`http://localhost:8080/api/productos/${id}`, {
        method: 'DELETE',
        body:data
    })
    .then(result => {
        return result.json();
    })
    .then(json => {
        console.log(json);
    })

})


////Agregar productos al carrito
//Variables

const listaProductos = document.querySelector('#productsTable');


cargarEventListeners();

function cargarEventListeners() {
    listaProductos.addEventListener('click', agregarProducto);
}

function agregarProducto (e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        

        leerDatosProductos(productoSeleccionado);
        

    fetch(`http://localhost:8080/api/carrito`, {
        method: 'POST',
        body: JSON.stringify(productoSeleccionado),
        headers:{
            'Content-Type': 'application/json'
          }
    })
    .then(result => {
        return result.json();
    })
    .then(json => {
        console.log(json);
    })
    .catch(error => {
        console.log(`Hubo un error: ${error}`)
    })
    }
}
//Funciones

function leerDatosProductos(producto) {
    
    const infoProducto = {
        title: producto.querySelector('#title-product').textContent,
        imagen: producto.querySelector('#img-product').src,
        descripcion: producto.querySelector('#description-product').textContent,
        precio: producto.querySelector('#price-product').textContent,
        stock: producto.querySelector('#stock-product').textContent,
        codigo: producto.querySelector('#codigo-product').textContent,
        timestamp: producto.querySelector('#timestamp-product').textContent
    }
    console.log(infoProducto)
    
}
