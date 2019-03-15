window.onload = function() {
   var addtocartbtns = document.getElementsByClassName("addtocartbutton");
   var shoppingcart = document.getElementById("shoppingcart");
   var cartitem = document.querySelectorAll("#shoppingcart ul")[0];
   var emptyCart = document.getElementById("emptyCart");

   currentCart = JSON.parse(localStorage.getItem('cart'));
   
   if (!currentCart) {
       currentCart = new Array();
   }

   UpdateShoppingCartUI();

   var currentCart = new Array();

   for (var i = 0; i < addtocartbtns.length; i++) {
       addtocartbtns[i].addEventListener("click", function (ev) {
           var furnitureId = this.getAttribute("data-item");
           var furniturePrice = this.getAttribute("data-price");
           var item = {id:furnitureId, price:furniturePrice};

           currentCart.push(item);
           UpdateShoppingCartUI();
        });
    }

    function UpdateShoppingCartUI() {
        cartitem.innerHTML = "";

        for (var i = 0; i < currentCart.length; i++) {
            var liElement = document.createElement('li');
            liElement.innerHTML = 
            currentCart[i].id + " " + currentCart[i].price + "";
            cartitem.appendChild(liElement);
        }

        // --- perhatikan bagian ini -->
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    emptyCart.addEventListener("click", function (ev) {
        currentCart = new Array();

        UpdateShoppingCartUI();
    });
}
