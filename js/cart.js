window.onload = function() {
   var addtocartbtns = document.getElementsByClassName("addtocartbutton");
   var shoppingcart = document.getElementById("shoppingcart");
   var cartitem = document.querySelectorAll("#shoppingcart ol")[0];
   var emptyCart = document.getElementById("emptyCart");
   var temp_total = 0;
   var total = 0;
   var total_real_price = document.getElementsByClassName("total-real-price");
   var div_total = document.createElement("div");

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
           var furnitureRealPrice = this.getAttribute("data-real-price");
           var item = {id:furnitureId, price:furniturePrice, realPrice:furnitureRealPrice};

           currentCart.push(item);
           UpdateShoppingCartUI();
        });
    }

    function UpdateShoppingCartUI() {
        cartitem.innerHTML = "";

        for (var i = 0; i < currentCart.length; i++) {
            var liElement = document.createElement('li');
            liElement.innerHTML = 
            currentCart[i].id + " " + new Intl.NumberFormat(['ban', 'id'], { style: 'currency', currency: 'IDR' }).format(currentCart[i].realPrice) + "";
            cartitem.appendChild(liElement);
            total = parseInt(temp_total) + parseInt(currentCart[i].realPrice);
        }

        if(!div_total){
          // document.getElementById("total").appendChild(div_total); 
        }else{
            temp_total = total;
            div_total.innerHTML = '<p> ============= +</p>'+
              '<p>Total '+new Intl.NumberFormat(['ban', 'id'], { style: 'currency', currency: 'IDR' }).format(total)+'</p>';
            document.getElementById("total").appendChild(div_total);
        }

        // --- perhatikan bagian ini -->
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    if(emptyCart) {
      emptyCart.addEventListener("click", function (ev) {
        currentCart = new Array();
        temp_total = 0;
        total = 0;
        UpdateShoppingCartUI();
      }); 
    }
}
