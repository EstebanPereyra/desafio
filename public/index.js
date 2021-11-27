const socket = io();
//--------------------EVENTOS DE SOCKET--------------------------------
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