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