
(async () => {
  // Get buttons
  const addToCartButtons = document.querySelectorAll(".addToCart");

  // Add event listeners
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const { productId, cartId } = event.target.dataset;

      // Add product to cart
      try {
        const response = await fetch(
          `/api/carts/${cartId}/product/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (result.error) throw new Error(result.error);

        // Show success toast
        Toastify({
          text: `Product added to cart`,
          destination: `/carts`,
          duration: 10000,
          gravity: "bottom",
          position: "right",
          backgroundColor: "#87ceeb",
          stopOnFocus: false,
        }).showToast();
      } catch (error) {
        // Show error toast
        Toastify({
          text: `${error}`,
          duration: 10000,
          gravity: "bottom",
          position: "right",
          backgroundColor: "#87ceeb",
          stopOnFocus: false,
        }).showToast();
      }
    });
  });
})();

(() => {
  // if query param loginSuccessful is true, show notification
  const urlParams = new URLSearchParams(window.location.search);
  const loginSuccessful = urlParams.get("loginSuccessful");

  if (loginSuccessful === "true") {
    Toastify({
      text: "User logged in successfully",
      duration: 10000,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#87ceeb",
      stopOnFocus: false,
    }).showToast();

    // remove query param
    window.history.replaceState({}, document.title, "/products");
  }
})();