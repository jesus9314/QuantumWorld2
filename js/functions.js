//funciones del comportamiento de los menús
function fnToggle(){
    if (cart.className === "cart appearCart") {
        cart.classList.remove("appearCart")
        navbarItems.classList.add("appearMenu")
    } else {
        navbarItems.classList.toggle("appearMenu")
    }
    if (fullCart.className === "fullCart show") {
        fullCart.classList.remove("show")
    }
}
function fnCart(){
    fullCart.classList.toggle("show")
    if (navbarItems.className === "navbar__items appearMenu") {
        navbarItems.classList.remove("appearMenu")
        cart.classList.add("appearCart")

    } else {
        cart.classList.toggle("appearCart")
    }
}
function fnWindowClose(e){
    if (e.target === fullCart) {
        fullCart.classList.remove("show")
        cart.classList.remove("appearCart")
    }
}
function fnClose(){
    cart.classList.remove("appearCart")
    fullCart.classList.remove("show")
}
/*
<------------------------------------------------------------------>
<------------------------------------------------------------------>
*/
//agrega un array al localStorage
function addLocalStorage(name, array) {
    const jsonArray = JSON.stringify(array)
    localStorage.setItem(name, jsonArray)
}
//obtener la data de un item del localStorage
function getDataFromStorage(name) {
    const data = JSON.parse(localStorage.getItem(name))
    return data
}
//limpia los valores de un item
function cleanData(item) {
    localStorage.removeItem(item)
}
/*
<------------------------------------------------------------------>
<------------------------------------------------------------------>
*/
//function para imprimir todos los productos
function printProducts(container, array){
    array.forEach( a =>{
        const el = createCard(a)
        container.append(el)
    })
}

//crea una tarjeta y retorna el elemento creado
function createCard(obj) {
    //destructuring del objeto
    const {
        url,
        name,
        price,
        id
    } = obj
    const el = document.createElement('div')
    el.classList.add('product__card')
    el.innerHTML = `
    <figure class="product__img">
        <img src=${url} alt="${name}"/>
    </figure>
    <div class="product__content">
        <h2>${name}</h2>
        <p>${formatQty(price)}</p>
        <button class="product__button" data-id=${id}>
            <i class="fa-solid fa-circle-plus"></i> 
            Agregar
        </button>
    </div>
    `
    return el
}
//crea un elemento en el carrito de compras
function createCartElement(obj) {
    //destructuring del objeto
    const {
        url,
        name,
        price,
        id,
        qty
    } = obj
    const el = document.createElement('div')
    el.classList.add('cart__item')
    el.innerHTML = `
    <figure>
        <img src=${url} alt="${name}"/>
    </figure>
    <div class="itemContent">
        <h3>${name}</h3>
        <p>
            <span class="qty" data-id=${id}>${qty}</span> x <span class="price">${formatQty(price)}</span>
        </p>
    </div>
    `
    return el
}
// Retorna si el objeto existe en el array en base a su id
function isProduct(id, array) {
    const result = array.some(a => a.id === id)
    return result
}
// Retorna un objeto del array en base a su id
function getProduct(id, array) {
    const result = array.find(a => a.id === id)
    return result
}
//actualizamos el la cantidad del producto
function updateQty(array, id) {
    array.forEach(a => {
        if (a.id === id) {
            a.qty++
        }
        const qty = document.querySelectorAll(".qty")
        qty.forEach(q => {
            if (Number(q.getAttribute('data-id')) === id) {
                q.innerText = a.qty
            }
        })
    })
}
//obtenemos la cantidad de elementos que hay en nuestro carrito
function getTotalElements(array){
    return result = array.reduce((acumulador, suma)=>acumulador + suma.qty,0)
}
//Obtenemos el precio total a pagar por el carrito
function getTotalPrice(array){
    return result = array.reduce((acumulador, suma) =>acumulador +(suma.qty*suma.price),0)
}
//Agregamos los eventos a cada botón de cada producto
function fnAdda(b){
    let p = {}
    const id = Number(b.getAttribute("data-id"))
    const producto = getProduct(id, productos)
    const exist = isProduct(id,carrito)
    if (exist) {
        updateQty(carrito,id)
        addLocalStorage("carrito",carrito)
        totalProducts = carrito.reduce((acum,sum) =>{
            return acum + sum.qty
        },0)
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
    totalPriceID.innerText = totalPrice
}

//Damos formato de precio
function formatQty(qty){
    return format = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(qty)
}
