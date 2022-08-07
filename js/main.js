/* Menu */
const btnToggle = document.querySelector("#btn-toggle")
const btnCart = document.querySelector("#btn-cart")

const navbarItems = document.querySelector("#list")
const cart = document.querySelector("#cart")
const closeCart = document.querySelector("#close")

btnToggle.addEventListener('click', () => {
    if(cart.className === "cart appear"){
        cart.classList.remove("appear")
        navbarItems.classList.add("appear")
    }else{
        navbarItems.classList.toggle("appear")
    }
})
btnCart.addEventListener('click',()=>{
    if(navbarItems.className=== "navbar__items appear"){
        navbarItems.classList.remove("appear")
        cart.classList.add("appear")
    }else{
        cart.classList.toggle("appear")
    }
})
closeCart.addEventListener('click',()=>{
    cart.classList.remove("appear")
})