//funciones del comportamiento de los menús
const fnToggle = () => {
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
const fnCart = () => {
    fullCart.classList.toggle("show")
    if (navbarItems.className === "navbar__items appearMenu") {
        navbarItems.classList.remove("appearMenu")
        cart.classList.add("appearCart")

    } else {
        cart.classList.toggle("appearCart")
    }
}
const fnWindowClose = e => {
    if (e.target === fullCart) {
        fullCart.classList.remove("show")
        cart.classList.remove("appearCart")
    }
}
const fnClose = () => {
    cart.classList.remove("appearCart")
    fullCart.classList.remove("show")
}
/*
<------------------------------------------------------------------>
<------------------------------------------------------------------>
*/
//obtenemos la cantidad de elementos que hay en nuestro carrito
const getTotalElements = array => {
    return result = array.reduce((acumulador, suma) => acumulador + suma.qty, 0)
}
//Obtenemos el precio total a pagar por el carrito
const getTotalPrice = array => {
    return result = array.reduce((acumulador, suma) => acumulador + (suma.qty * suma.price), 0)
}
//Damos formato de precio
const formatQty = qty => {
    return format = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(qty)
}
/*
<------------------------------------------------------------------>
<------------------------------------------------------------------>
*/

//agrega un array al localStorage
const addLocalStorage = array => {
    const jsonArray = JSON.stringify(array)
    localStorage.setItem('carrito', jsonArray)
}
//obtener la data de un item del localStorage
const getDataFromStorage = name => {
    const data = JSON.parse(localStorage.getItem(name))
    return data
}
//limpiamos el carrito
const cleanCart = e => {
    e.preventDefault()
    Swal.fire({
        title: '¿Estás seguro que deseas limpiar tu carrito por completo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then( result =>{
        if(result.isConfirmed){
            localStorage.clear()
            location.reload();
        }
    })
}
/*
<------------------------------------------------------------------>
<------------------------------------------------------------------>
*/
//Actualizar la notificacion
const updateNotification = () => {
    const totalProducts = getTotalElements(carrito)
    const noti = document.querySelector("#notification")
    if (totalProducts) {
        noti.innerText = totalProducts
    } else {
        noti.innerText = 0
    }
}
//actualizar el total
const updateTotal = () => {
    const total = getTotalPrice(carrito)
    const totalPriceEl = document.querySelector('#totalPrice')
    totalPriceEl.innerText = formatQty(total)
}
//function para imprimir todos los productos
const printProducts = (container, array) => {
    array.forEach(a => {
        createCard(a)
    })
}
const renderCart = () => {
    carrito.forEach(i => {
        createCartElement(i)
    })
    updateNotification()
}
// Retorna si el objeto existe en el array en base a su id
const isProduct = (id, array) => {
    id = Number(id)
    const result = array.some(a => a.id === id)
    return result
}
// Retorna una copia del objeto para no modificar el original usando el operador spread
const getProduct = (id, array) => {
    const result = {
        ...array.find(a => a.id === id)
    }
    return result
}
//retorna el mismo objeto
const getProductOriginal = (id, array) => {
    const result = array.find(a => a.id === id)
    return result
}
const addCart = e => {
    if (e.target.classList.contains('product__button')) {
        const id = Number(e.target.dataset.id)
        setCarrito(id)
    }
    e.stopPropagation()
}
// Agregamos los productos al carrito
const setCarrito = id => {
    let producto = getProductOriginal(id, carrito)
    if (isProduct(id, carrito)) {
        //cuando el producto ya está, solo actualizamos la cantidad dependiendo del stock
        if (producto.qty < producto.stock) {
            producto.qty++
        }
        updateQty(id, producto.qty)
        updateNotification()
        updateTotal()
        addLocalStorage(carrito)
    } else {
        //cuando agregamos el producto por primera vez
        producto = getProduct(id, productos)
        producto.qty = 1
        carrito.push(producto)
        createCartElement(producto)
        updateNotification()
        updateTotal()
        addLocalStorage(carrito)
        Swal.fire({
            title: `Se ha agregado ${producto.name} con éxito a tu carrito`,
            icon: 'success',
            toast: true,
            position: 'bottom-start',
            timer: 3000,
            showConfirmButton: false
        })
    }
}
//crea una tarjeta y retorna el elemento creado
const createCard = obj => {
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
const createCartElement = obj => {
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
    el.setAttribute('data-id', id)
    el.innerHTML = `
    <div class="item">
        <figure>
            <img src=${url} alt="${name}"/>
        </figure>
        <div class="itemContent">
            <h3>${name}</h3>
            <p>
                <button class="btn-qty increase" data-id=${id}> + </button>
                <span class="qty" data-id=${id}>${qty}</span>
                <button class="btn-qty decrease" data-id=${id}> - </button> x <span class="price">${formatQty(price)}</span>
            </p>
        </div>
    </div>
    <a class="btn-delete">
		<i class="fa-solid fa-trash-can delete" data-id=${id}></i>
	</a>
    `
    bodyCart.append(el)
}
//actualizamos el la cantidad del producto
const updateQty = (id, qty) => {
    const items = document.querySelectorAll('.cart__item')
    let el = ""
    for (let i = 0; i < items.length; i++) {
        if (Number(items[i].dataset.id) === id) {
            el = items[i]
        }
    }
    el.querySelector('.qty').innerText = qty
}
//funcionalidades de los botones de cada item del carrito
const modifyQty = e => {
    let id = ""
    if (e.target.classList.contains('increase')) {
        //cuando se da click al botón de incrementar
        id = Number(e.target.dataset.id)
        const producto = getProductOriginal(id, carrito)
        if (producto.qty < producto.stock) {
            producto.qty++
        }
        updateNotification()
        updateQty(id, producto.qty)
        updateTotal()
        addLocalStorage(carrito)

    } else if (e.target.classList.contains('decrease')) {
        //cuando se da click al botón de decrementar
        id = Number(e.target.dataset.id)
        const el = e.target.parentElement.parentElement.parentElement.parentElement
        const producto = getProductOriginal(id, carrito)
        if (producto.qty === 1) {
            alertDelete(producto, id, el)
        }
        if (producto.qty > 1) {
            producto.qty--
            updateQty(id, producto.qty)

        }
        updateNotification()
        updateTotal()
        addLocalStorage(carrito)

    } else if (e.target.classList.contains('delete')) {
        //cuando se da click al botón de eliminar
        id = Number(e.target.dataset.id)
        const el = e.target.parentElement.parentElement
        const producto = getProductOriginal(id, carrito)
        alertDelete(producto, id, el)
        updateNotification()
        updateTotal()
        addLocalStorage(carrito)
    }
    e.stopPropagation()
}
// Eliminación del producto
const deleteItem = (id, element) => {
    const item = getProductOriginal(id, carrito)
    const index = carrito.indexOf(item)
    carrito.splice(index, 1)
    element.remove()
}
const alertDelete = (producto, id, el) => {
    Swal.fire({
        title: `¿Estás seguro que deseas eliminar ${producto.name} de tu carrito?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then(result => {
        if (result.isConfirmed) {
            deleteItem(id, el)
            updateNotification()
            updateTotal()
            addLocalStorage(carrito)
            Swal.fire({
                title: 'Producto Eliminado',
                icon: 'success',
            })
        }
    })
}