// JavaScript för att implementera kraven A-E.

/*public lets/conts*/
    let randomStatus = Math.floor((Math.random() * 10) + 1);

    console.log(randomStatus)
/*Prouckter*/ 
    fetch('http://demo.edument.se/api/products')
    .then(response => response.json())
    .then(products => items(products))

/*Produckt Poster*/
    function items(data){
        data.forEach(data => {
            let pds = $("#produckter");
            let div = $("<div></div>");
            let pen1 = $("<h3></h3>");
            let pen4 = $("<p></p>")
            let pen2 = $("<p></p>");
            let pen3 = $("<p></p>");
            let img = $("<img>");
            let button = $("<button></button>");

            $(button).attr("class", "add_to_cart");
            $(pen4).attr("class", "add_to_cart");

            $(pds).append(div);
            
            $(div).append(pen1,pen4,pen2,pen3,img,button);
            
            $(pen1).html(data.Name);
            $(pen4).html(Math.floor((Math.random() * 10) + 1))
            $(pen2).html(data.Price)
            $(pen3).html(data.Description)
            $(img).attr("src", data.Image)
            $(button).html("Add to Cart");
    });
    }
/*Add to cart*/
$( document ).ready(function() {
    $(".add_to_cart").click(function(event){
        event.preventDefault();
        let id = $(this).attr("data-id");
        let name = $(this).attr("data-name");
        let price = Number($(this).attr("data-price"));
        let description = ($(this).attr("data-description"));
        let image = ($(this).attr("data-image"));
        let url = ($(this).attr("data-url"));
    
        addItemToCart(id, name, price,description,image,url, 1);
        displayCart();
    });
});

function displayCart(){
    let cartArray = listCart();
    let output = " " + countCart();
    $("#shoppingCart").html(output);  
}

$("#clear-cart").click(function(event){
    clearCart();
    displayCart();
})

/* Shopping carts functions */

let cart = [];

let Item = function(id, name, price,description,image,url, count) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.url = url;
    this.count = count;
}

function addItemToCart(id, name, price,description,image,url, count) {
    for(let i in cart) {
        if(cart[i].name === name){
            cart[i].count += count;
            saveCart();
            return;
        }
    }
    let item = new Item(id, name, price,description,image,url, count);
    cart.push(item);
    saveCart();
}

function removeItemFromCart(name) {
    for(let i in cart){
        if(cart[i].name === name) {
            cart[i].count --;

            if(cart[i].count === 0) {
                cart.splice(i, 1);
            }
        }
    }
    saveCart();
}

function removeItemFromCartAll(name) {
    for(let i in cart) {
        if(cart[i].name === name){
            cart.splice(i, 1);
            break;
        }
    }
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function countCart() {
    let totalCount = 0;
    for(let i in cart){
        totalCount += cart[i].count;
    }

    return totalCount;
}

function listCart() {
    return JSON.parse(JSON.stringify(cart));
}

function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}


function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

loadCart();
displayCart();
/*Cart*/
function checkForm(){
    
    if(countCart => 1)
    {
        fetch('http://localhost:3000/orders',{
            method: 'POST',
            body: JSON.stringify({OrderItems: cart}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })            
        })
    }
}

console.log(cart)