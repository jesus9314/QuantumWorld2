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
const carritoContent = document.querySelector(".cart__body")
const totalPriceID = document.querySelector("#totalPrice")
const noti = document.querySelector("#notification")
const productsContainer = document.querySelector("#products")
const container = document.querySelector('.products')


let carrito = getDataFromStorage('carrito') //inicializamos el carrito con el valor almacenado en el localstorage
//Inicializamos los valores totales en cero
let totalProducts = 0
let totalPrice = 0
const productos = []

//////////////////////////////////////////////////////////////////////////////////
//2 formas de insertar los productos
//Hacemos fetch a una api, y mediante la función setProducts, agregamos estos productos a nuestro arreglo para poder ser modificados más facilmente
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => setProducts(data))


// Creamos productos empleando la clase Produc y los empujamos al mismo array
productos.push(new Product(21, 'Core I5 12400', 1200, 'img/ci512400.jpg', 5, 'intel'))
productos.push(new Product(22, 'RTX 2060 MSI', 2800, 'img/rtx2060msi.jpg', 3, 'MSI'))
productos.push(new Product(23, 'Placa Asus Prime A320', 350, 'img/asusPrimea320.jpg', 6, 'Asus'))
productos.push(new Product(24, 'Placa Asus Prime A320', 350, 'img/asusPrimea320.jpg', 6, 'Asus'))
productos.push(new Product(25, 'Placa Asus Prime A320', 350, 'img/asusPrimea320.jpg', 6, 'Asus'))
productos.push(new Product(26, 'Placa Asus Prime A320', 350, 'img/asusPrimea320.jpg', 6, 'Asus'))
productos.push(new Product(27, 'Placa Asus Prime A320', 350, 'img/asusPrimea320.jpg', 6, 'Asus'))

//////////////////////////////////////////////////////////////////////////////////

//al cargar la página, si el carrito tiene productos los renderizamos, caso contrario, lo inicializamos como un array vacío
carrito ? renderCart() : (
    carrito = [],
    updateNotification(),
    updateTotal()
)

//imprimimos todos productos 
printProducts(productsContainer, productos)

//agregamos los eventos a los botones empleando event delegation
container.addEventListener('click', e => addCart(e)) //botones de los productos
carritoContent.addEventListener('click', e => modifyQty(e)) //botones de cada item del carrito
document.querySelector("#clean").addEventListener('click', e => cleanCart(e)) //Limpiamos el valor del carrito