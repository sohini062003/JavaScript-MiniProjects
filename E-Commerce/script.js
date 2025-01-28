document.addEventListener("DOMContentLoaded", function () {
    let item_list = document.getElementById("item-list-1");
    let cart_list=document.getElementById("cart-list");
    let totaldisplay=document.getElementById("Total-price");
    let checkout=document.getElementById("checkout");
    let cart_total=document.getElementById("cart-total");
    let errmsg=document.getElementById("empty-cart");
    let Checkoutmsg=document.getElementById("Checkoutmsg");

    const items = [
        { id: 1, name: "Top", price: 500 },
        { id: 2, name: "Bottom", price: 700 },
        { id: 3, name: "Shoes", price: 1000 },
        { id: 4, name: "Bag", price: 300 }
    ];
    let cart=[];
    let total=0;

    items.forEach(item => {
        console.log(item.id);
        const tableRow = document.createElement("tr");
        tableRow.classList.add("text-light")
        
        tableRow.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><button class="btn btn-primary btn-sm " data-id="${item.id}">Add to Cart</button></td>
            
        `;

        item_list.appendChild(tableRow);

    });
    item_list.addEventListener('click', (e) =>{
        if(e.target.tagName==="BUTTON"){
            const prod_id= parseInt(e.target.getAttribute("data-id"));
            const selectedItem = items.find(item => item.id === prod_id);
            console.log(selectedItem);
            add(selectedItem);
        }
    });

        function add(selecteditem){
            
            const existingitem=cart.find(j=>j.id == selecteditem.id)
            console.log("Existing",existingitem);

            if(existingitem){
                existingitem.quantity++;
                updatequantity(existingitem);
            }
            else{
                const newitem={...selecteditem, quantity:1};
                cart.push(newitem);
                const cartitem= document.createElement("li");
                cartitem.setAttribute("data-id", newitem.id);
                cartitem.innerHTML= `${newitem.name} - $${newitem.price} x <span class="quantity">${newitem.quantity}</span>
                <br>
               <div> <button class="btn btn-danger btn-sm remove-btn" data-id="${newitem.id}">Remove</button></div>

                        `;
                cart_list.appendChild(cartitem);
            }
                if(cart.length!=0){
                    errmsg.classList.add("hidden");
                    cart_total.classList.remove("hidden");
                    
                        total+= selecteditem.price;
                        
                        totaldisplay.textContent = `Total: $${total.toFixed(2)}`;
                }
                else{
                   errmsg.classList.remove("hidden");
                   cart_total.classList.add("hidden");
                }

        }
    
            
            cart_list.addEventListener('click', (e) =>{
                if(e.target.classList.contains("remove-btn")){
                    const prod_id= parseInt(e.target.getAttribute("data-id"));
                    const selectedItem = items.find(item => item.id === prod_id);
                    if(selectedItem){
                        deletion(selectedItem);
                    }
                    
                }
            });

            function deletion(selectedItem){
                const itemRemove=cart.find(item => item.id === selectedItem.id);
                if(itemRemove){
                    cart = cart.filter(t => t.id !== itemRemove.id);
                    total-=itemRemove.price* itemRemove.quantity;
                
                    const cartItemElement = cart_list.querySelector(`li[data-id="${selectedItem}"]`);
                    if (cartItemElement) {
                        cartItemElement.remove();
                    }
            }
                totaldisplay.textContent = `Total: $${total.toFixed(2)}`;
                if (cart.length === 0) {
                    errmsg.classList.remove("hidden");
                    cart_total.classList.add("hidden");
                } else {
                    errmsg.classList.add("hidden");
                    cart_total.classList.remove("hidden");
                }

            }
                
        function updatequantity(item){
            const cartItem = cart_list.querySelector(`li[data-id="${item.id}"]`);
            const quantityElement = cartItem.querySelector(".quantity");
            quantityElement.textContent = item.quantity;
        }
    

        checkout.addEventListener('click', () =>{
            if(cart.length!=0){
            
            Checkoutmsg.textContent=`Pay ${total}. Complete the Payment process!`;
            cart.length=0;
            cart_list.innerHTML="";
            
            }
           
        });
        
       

    });

