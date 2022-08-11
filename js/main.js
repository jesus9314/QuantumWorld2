/* Menu */
const btnToggle = document.querySelector("#btn-toggle")
const btnCart = document.querySelector("#btn-cart")

const navbarItems = document.querySelector("#list")
const cart = document.querySelector("#cart")
const closeCart = document.querySelector("#close")
const fullCart = document.querySelector("#fullCart")
const carritoContent = document.querySelector("#cart__body")
const totalPriceID = document.querySelector("#totalPrice")
const noti = document.querySelector("#notification")
let totalProducts = 0
let totalPrice = 0
let carrito = JSON.parse(localStorage.getItem('carrito'))

if(carrito){
    carrito.forEach( p =>{
        const el = document.createElement('div')
        el.classList.add('cart__item')
        el.innerHTML =`
        <figure>
                        <img src=${p.url} alt=${p.name} />
                    </figure>
                    <div class="itemContent">
                        <h3>${p.name}</h3>
                        <p><span class="qty" data-id=${p.id}>${p.qty}</span> x <span class="price">S/${p.price}</span></p>
                    </div>
        `
        carritoContent.append(el)
    })
    totalPrice=carrito.reduce((acum,sum) =>{
        return acum + (sum.qty*sum.price)
    },0)
    totalProducts = carrito.reduce((acum,sum) =>{
        return acum + sum.qty
    },0)
    noti.innerText=totalProducts
}else{
    carrito = []
    totalPrice = 0
    totalProducts = 0
}
noti.innerText=totalProducts
totalPriceID.innerText = `S/${totalPrice}`

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

const productos = [{
        id: 0,
        name: 'Procesador Intel Core i5-12400 2.50-4.40GHz 18MB Smart LGA1700 117W Intel 7 10nm',
        price: 1200,
        stock: 5,
        brand: 'intel',
        url: 'img/ci512400.jpg'
    },
    {
        id: 1,
        name: 'Tarjeta de video MSI Nvidia GeForce RTX 3060 GAMING X 12GB',
        price: 2800,
        stock: 3,
        brand: 'MSI',
        url: 'img/asusPrimea320.jpg'
    },
    {
        id: 2,
        name: 'PLACA MSI A320M-A PRO MAX AM4 AMD A320 DDR4 SATA 6.0 USB 3.2.',
        price: 350,
        stock: 5,
        brand: 'Asus',
        url: 'img/rtx2060msi.jpg'
    }
]
const productsContainer = document.querySelector("#products")
productos.map(p => {
    const {
        id,
        name,
        price,
        stock,
        brand,
        url
    } = p
    const element = document.createElement('div')
    element.classList.add('product__card')
    element.innerHTML = `
    <figure class="product__img">
        <img src=${url} alt="Core I5 12400" />
    </figure>
    <div class="product__content">
        <h2>${name}</h2>
        <p>S/${price}</p>
        <button class="product__button" data-id=${id}><i class="fa-solid fa-circle-plus"></i> Agregar</button>
    </div>
    `
    productsContainer.append(element)
})

const btnAdd = document.querySelectorAll(".product__button")
btnAdd.forEach(b => {
    b.addEventListener('click', () => {
        const p = {}
        const id = Number(b.getAttribute("data-id"))
        const producto = productos.find(p => p.id === id)
        const find = carrito.some(p => p.id === id)
        if (find) {
            carrito.forEach(p => {
                if (p.id === id) {
                    p.qty++
                }
                
                const qty = document.querySelectorAll(".qty")
                qty.forEach( q => {
                    if(Number(q.getAttribute('data-id')) === id){
                        q.innerText = p.qty
                    }
                })
            })
            localStorage.setItem('carrito', JSON.stringify(carrito))
            totalProducts = carrito.reduce((acum,sum) =>{
                return acum + sum.qty
            },0)
            noti.innerText=totalProducts
        } else {
            p.id = producto.id
            p.name = producto.name
            p.price = producto.price
            p.brand = producto.brand
            p.url = producto.url
            p.qty = 1
            carrito.push(p)
            const element = document.createElement('div')
            element.classList.add('cart__item')
            element.innerHTML = `
            <figure>
							<img src=${p.url} alt=${p.name} />
						</figure>
						<div class="itemContent">
							<h3>${p.name}</h3>
							<p><span class="qty" data-id=${p.id}>${p.qty}</span> x <span class="price">S/${p.price}</span></p>
						</div>
            `
            carritoContent.append(element)
            localStorage.setItem('carrito', JSON.stringify(carrito))
            totalProducts = carrito.reduce((acum,sum) =>{
                return acum + sum.qty
            },0)
            noti.innerText=totalProducts
        }
        totalPrice=carrito.reduce((acum,sum) =>{
            return acum + (sum.qty*sum.price)
        },0)
        totalPriceID.innerText = totalPrice

        
    })
})
document.querySelector("#clean").addEventListener('click', e =>{
    e.preventDefault()
    if(confirm("Seguro que desea limpiar su carrito?")){
        localStorage.clear()
        location.reload();
    }
})