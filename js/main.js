/* Menu */
const btnToggle = document.querySelector("#btn-toggle")
const btnCart = document.querySelector("#btn-cart")

const navbarItems = document.querySelector("#list")
const cart = document.querySelector("#cart")
const closeCart = document.querySelector("#close")
const fullCart = document.querySelector("#fullCart")

btnToggle.addEventListener('click', () => {
    if(cart.className === "cart appearCart"){
        cart.classList.remove("appearCart")
        navbarItems.classList.add("appearMenu")
    }else{
        navbarItems.classList.toggle("appearMenu")
    }
    if(fullCart.className === "fullCart show"){
        fullCart.classList.remove("show")
    }
})
btnCart.addEventListener('click',()=>{
    fullCart.classList.toggle("show")
    if(navbarItems.className=== "navbar__items appearMenu"){
        navbarItems.classList.remove("appearMenu")
        cart.classList.add("appearCart")
        
    }else{
        cart.classList.toggle("appearCart")
    }
})
closeCart.addEventListener('click',()=>{
    cart.classList.remove("appearCart")
    fullCart.classList.remove("show")
})
fullCart.addEventListener('click',(e)=>{
    let sectionClicked = window.innerWidth - cart.clientWidth
    if(e.clientX <= sectionClicked){
        if(fullCart.className === "fullCart show"){
            fullCart.classList.remove("show")
            cart.classList.remove("appearCart")
        }
    }
})