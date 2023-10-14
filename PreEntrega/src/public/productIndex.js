(async () => {
    // Obtener el carrito o crearlo si no existe
    let cart = await fetchCart();
  
    const addToCartButtons = document.querySelectorAll(".addToCart");
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const productId = event.target.dataset.id;
  
        try {
          // Agregar el producto al carrito
          const response = await addToCart(cart._id, productId);
          cart = await response.json();
  
          // Mostrar mensaje de éxito y enlace al carrito
        } catch (error) {
 
 console.log(error)
        }
      });
    });
  })();
  
  // Función para obtener el carrito o crearlo
  async function fetchCart() {
    const cartResponse = await fetch("/api/carts");
    let [cart] = await cartResponse.json();
  
    if (!cart) {
      const createCartResponse = await fetch("/api/carts", { method: "POST" });
      cart = await createCartResponse.json();
    }
  
    return cart;
  }
  
  // Función para agregar producto al carrito
  async function addToCart(cartId, productId) {
    return await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: "POST",

    });
  }
  
