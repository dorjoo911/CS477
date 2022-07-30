window.onload = function(){
    let url = new URL(location.href);
    const prodId = url.searchParams.get('id');
    fetchProductById(prodId);
    document.getElementById('edit-button').onclick = function(event) {
        event.preventDefault();
        editProductById(prodId);
    }
}

function fetchProductById(id){
    console.log(id);
    fetch('http://localhost:3000/products/'+ id)
        .then(response => response.json())
        .then(prod => {
            document.getElementById('title').value = prod.title;
            document.getElementById('price').value = prod.price;
            document.getElementById('description').value = prod.description;
        });
}

async function editProductById(id){
    const response = await fetch('http://localhost:3000/products/'+id, {
        method: 'PUT',
        body: JSON.stringify({
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        window.location = 'index.html';
    }
}