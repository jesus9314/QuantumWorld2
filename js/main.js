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

if(carrito){
    //si el carrito no es null, creamos las tarjetas de productos
    carrito.forEach( p =>{
        const el = createCartElement(p)
        carritoContent.append(el)
    })
    //ya que el carrito tiene elementos entonces asignamos los valores correspondientes a los totales
    totalProducts = getTotalElements(carrito)
    totalPrice = getTotalPrice(carrito)
    noti.innerText=totalProducts
}else{
    //sino inicializamos los valores vacios o en '0'
    carrito = []
    totalPrice = 0
    totalProducts = 0
}
noti.innerText=totalProducts
totalPriceID.innerText = `S/${totalPrice}`

//Agregamos productos al array
productos.push(new Product(0,'Core I5 12400',1200, 'img/ci512400.jpg',5,'intel'))
productos.push(new Product(1,'RTX 2060 MSI',2800, 'img/rtx2060msi.jpg',3,'MSI'))
productos.push(new Product(2,'Placa Asus Prime A320',350, 'img/asusPrimea320.jpg',6,'Asus'))

//imprimimos todos productos 
printProducts(productsContainer,productos)

//Agregamos eventos a cada botón de agregar
const btnAdd = document.querySelectorAll(".product__button")
btnAdd.forEach(b => {
    b.addEventListener('click', () => {
        let p = {}
        const id = Number(b.getAttribute("data-id"))
        const producto = getProduct(id, productos)
        const exist = isProduct(id,carrito)
        if (exist) {
            updateQty(carrito,id)
            addLocalStorage("carrito",carrito)
            totalProducts = getTotalElements(carrito)
            noti.innerText=totalProducts
        } else {
            p = producto
            p.qty = 1
            carrito.push(p)
            const el = createCartElement(p)
            carritoContent.append(el)
            addLocalStorage('carrito',carrito)
            totalProducts = getTotalElements(carrito)
            noti.innerText=totalProducts
        }
        totalPrice=getTotalPrice(carrito)
        totalPriceID.innerText = formatQty(totalPrice)    
    })
})
//Limpiamos el valor del carrito
document.querySelector("#clean").addEventListener('click', e =>{
    e.preventDefault()
    if(confirm("Seguro que desea limpiar su carrito?")){
        localStorage.clear()
        location.reload();
    }
})