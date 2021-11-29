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

//Variables
let form = document.querySelector('#form');




document.addEventListener('submit', event => {
    event.preventDefault();
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