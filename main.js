const addProductButton = document.getElementById("add-product");
addProductButton.addEventListener("click", addProduct);

function addProduct() {
  const sellingPrice = document.getElementById("s-price").value;
  const productName = document.getElementById("p-name").value;

  const productData = {
    sellingPrice: sellingPrice,
    productName: productName
  };

  axios.post('https://crudcrud.com/api/fcb8a970a86042e2b66b11e3f76650f3/products', productData)
    .then(function (response) {
      const addedProduct = response.data;
      displayProduct(addedProduct);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function displayProduct(product) {
  const productContainer = document.getElementById("product-list");

  const productItem = document.createElement("p");
  productItem.textContent = "Product Name: " + product.productName + ", Selling Price: " + product.sellingPrice;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function() {
    deleteProduct(product._id);
  });

  productContainer.appendChild(productItem);
  productContainer.appendChild(deleteButton);
}

function deleteProduct(productId) {
  axios.delete(`https://crudcrud.com/api/fcb8a970a86042e2b66b11e3f76650f3/products/${productId}`)
    .then(function (response) {
      const productContainer = document.getElementById("product-list");
      productContainer.innerHTML = '<p>Total value of worth of products is: 0</p>';

      updateProductList();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function updateProductList() {
  axios.get('https://crudcrud.com/api/fcb8a970a86042e2b66b11e3f76650f3/products')
    .then(function (response) {
      const products = response.data;

      let totalWorth = 0;
      products.forEach(function (product) {
        totalWorth += parseFloat(product.sellingPrice);
      });

      const productList = document.getElementById("product-list");
      productList.textContent = "Total value of worth of products is: " + totalWorth;

      products.forEach(function (product) {
        displayProduct(product);
      });
    })
    .catch(function (error) {
      console.error(error);
    });
}
