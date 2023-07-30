const socket = io();


  // Capturar el evento de envío del formulario ||  Evitar que el formulario se envíe automáticamente
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); 

    const title = document.getElementById('inputProducto').value;
    const description = document.getElementById('inputDescripcion').value;
    const code = document.getElementById('inputCode').value;
    const price = document.getElementById('inputPrice').value;
    const status = document.getElementById('inputValue').value;
    const stock = document.getElementById('inputStock').value;
    const category = document.getElementById('inputCategory').value;
    const thumbnails = document.getElementById('inputImage').files[0];

    // Crear un objeto con los datos del producto
    const productoData = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };
  // Enviar el evento al servidor con los datos del producto
  socket.emit('guardarProducto', productoData, (productoAgregado) => {
    // Aquí puedes procesar la respuesta del servidor
    console.log('Producto guardado:', productoAgregado);
    // Código para mostrar el producto en la vista realtimeproducts
    const productosAgregadosDiv = document.getElementById('productosAgregados');
    const productoHTML = `
      <div>
        <h3>${productoAgregado.title}</h3>
        <p>${productoAgregado.description}</p>
        <p>${productoAgregado.code}</p>
        <p>${productoAgregado.price}</p>
        <p>${productoAgregado.status}</p>
        <p>${productoAgregado.stock}</p>
        <p>${productoAgregado.category}</p>
      </div>
    `;
    productosAgregadosDiv.innerHTML += productoHTML;
  });
});

// Escuchar el evento "productoAgregado" para actualizar la vista
socket.on('productoAgregado', (productoData) => {

  console.log('Nuevo producto agregado:', productoData);



  // Código para mostrar el producto en la vista realtimeproducts
  const productosAgregadosDiv = document.getElementById('productosAgregados');


  const productoHTML = `
  
  <div class="container">
  <div class="row">
  <div class="card card-narrow">
  <div class="card-body col-lg-4 col-md-6 col-sm-12">
    <p class="card-title">${productoData.title}</p>
    <p class="card-text">${productoData.description}</p>
    <p class="card-text">Código: ${productoData.code}</p>
    <p class="card-text">Precio: ${productoData.price}</p>
    <p class="card-text">Estado: ${productoData.status}</p>
    <p class="card-text">Stock: ${productoData.stock}</p>
    <p class="card-text">Categoría: ${productoData.category}</p>
  </div>
</div>
</div>
</div>
  `;
  productosAgregadosDiv.innerHTML += productoHTML;
});

