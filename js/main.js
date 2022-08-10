/* Menu */
const btnToggle = document.querySelector("#btn-toggle")
const btnCart = document.querySelector("#btn-cart")

const navbarItems = document.querySelector("#list")
const cart = document.querySelector("#cart")
const closeCart = document.querySelector("#close")
const fullCart = document.querySelector("#fullCart")

btnToggle.addEventListener('click', () => {
    if (cart.className === "cart appearCart") {
        cart.classList.remove("appearCart")
        navbarItems.classList.add("appearMenu")
    } else {
        navbarItems.classList.toggle("appearMenu")
    }
    if (fullCart.className === "fullCart show") {
        fullCart.classList.remove("show")
    }
})
btnCart.addEventListener('click', () => {
    fullCart.classList.toggle("show")
    if (navbarItems.className === "navbar__items appearMenu") {
        navbarItems.classList.remove("appearMenu")
        cart.classList.add("appearCart")

    } else {
        cart.classList.toggle("appearCart")
    }
})
closeCart.addEventListener('click', () => {
    cart.classList.remove("appearCart")
    fullCart.classList.remove("show")
})
window.addEventListener('click', e => {
    if (e.target === fullCart) {
        fullCart.classList.remove("show")
        cart.classList.remove("appearCart")
    }
})

//slick
$(document).ready(function(){
    $('.products').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        resposive: [
            {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
            }
        ]
    });
  });