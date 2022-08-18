/* Menús */
const btnToggle = document.querySelector("#btn-toggle")
const btnCart = document.querySelector("#btn-cart")
const closeCart = document.querySelector("#close")
const navbarItems = document.querySelector("#list")
const cart = document.querySelector("#cart")
const fullCart = document.querySelector("#fullCart")

// Asignamos las funciones correspondientes a cada evento de cada botón
btnToggle.addEventListener('click', fnToggle)
btnCart.addEventListener('click', fnCart)
closeCart.addEventListener('click', fnCart)
window.addEventListener('click', fnWindowClose)


// funcionalidades del Carrito

const carritoContent = document.querySelector("#cart__body")
const totalPriceID = document.querySelector("#totalPrice")
const noti = document.querySelector("#notification")
const productsContainer = document.querySelector("#products")


let carrito = getDataFromStorage('carrito') //inicializamos el carrito con el valor almacenado en el localstorage
//Inicializamos los valores totales en cero
let totalProducts = 0
let totalPrice = 0
const productos = []

productos.push(new Product(0, 'Core I5 12400', 1200, 'img/ci512400.jpg', 5, 'intel'))
productos.push(new Product(1, 'RTX 2060 MSI', 2800, 'img/rtx2060msi.jpg', 3, 'MSI'))
productos.push(new Product(2, 'Placa Asus Prime A320', 350, 'img/asusPrimea320.jpg', 6, 'Asus'))

if(carrito){
    renderCart(carrito)
}else{
    carrito = []
    updateNotification()
}


//Agregamos productos al array


//imprimimos todos productos 
printProducts(productsContainer, productos)

//agregamos los eventos a los botones
const container = document.querySelector('.products')
container.addEventListener('click', e => addCart(e))

//Limpiamos el valor del carrito
document.querySelector("#clean").addEventListener('click', e => {
    e.preventDefault()
    if (confirm("Seguro que desea limpiar su carrito?")) {
        localStorage.clear()
        location.reload();
    }
})