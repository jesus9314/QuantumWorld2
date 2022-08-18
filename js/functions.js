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
function addLocalStorage(array) {
    const jsonArray = JSON.stringify(array)
    localStorage.setItem('carrito', jsonArray)
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
//Actualizar la notificacion
function updateNotification(){
    const totalProducts = getTotalElements(carrito)
    const noti = document.querySelector("#notification")
    if(totalProducts){
        noti.innerText = totalProducts 
    }else{
        noti.innerText = 0 
    }
}
//function para imprimir todos los productos
function printProducts(container, array){
    array.forEach( a =>{
        createCard(a)
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
    const container = document.querySelector('.products')
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
    container.append(el)
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
    const bodyCart = document.querySelector('.cart__body')
    const el = document.createElement('div')
    el.classList.add('cart__item')
    el.setAttribute('data-id',id)
    el.innerHTML = `
    <div class="item">
        <figure>
            <img src=${url} alt="${name}"/>
        </figure>
        <div class="itemContent">
            <h3>${name}</h3>
            <p>
                <span class="qty" data-id=${id}>${qty}</span> x <span class="price">${formatQty(price)}</span>
            </p>
        </div>
    </div>
    <a class="btn-delete" data-id=${id}>
		<i class="fa-solid fa-trash-can"></i>
	</a>
    `
    bodyCart.append(el)
}
function renderCart(carrito){
    carrito.forEach( i =>{
        createCartElement(i)
    })
    updateNotification()
}
// Retorna si el objeto existe en el array en base a su id
function isProduct(id, array) {
    id = Number(id)
    const result = array.some(a => a.id === id)
    return result
}
// Retorna un objeto del array en base a su id
function getProduct(id, array) {
    const result = {...array.find(a => a.id === id)}
    return result
}
function addCart(e){
    if(e.target.classList.contains('product__button')){
        const id = Number(e.target.dataset.id)
        setCarrito(id)
    }
    e.stopPropagation()
}
function setCarrito(id){
    let producto = carrito.find( p => p.id === id)
    if(isProduct(id,carrito)){
        producto.qty++
        updateQty(id,producto.qty)
        updateNotification()
        addLocalStorage(carrito)
    }else{
        producto = getProduct(id,productos)
        producto.qty = 1
        carrito.push(producto)
        createCartElement(producto)
        updateNotification()
        addLocalStorage(carrito)
    }
}
//actualizamos el la cantidad del producto
function updateQty(id,qty) {
    const items = document.querySelectorAll('.cart__item')
    let el = ""
    for(let i=0; i<items.length;i++){
        if(Number(items[i].dataset.id) === id){
            el = items[i]
        }
    }
    el.querySelector('.qty').innerText=qty
}

/*
<------------------------------------------------------------------>
<------------------------------------------------------------------>
*/
//obtenemos la cantidad de elementos que hay en nuestro carrito
function getTotalElements(array){
    return result = array.reduce((acumulador, suma)=>acumulador + suma.qty,0)
}
//Obtenemos el precio total a pagar por el carrito
function getTotalPrice(array){
    return result = array.reduce((acumulador, suma) =>acumulador +(suma.qty*suma.price),0)
}
//Damos formato de precio
function formatQty(qty){
    return format = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(qty)
}
