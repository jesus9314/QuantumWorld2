//creamos la clase Producto
class Product{
    constructor(id,name,price,url,stock,brand){
        this.id = Number(id)
        this.name = name
        this.price = Number(price)
        this.url = url
        this.stock = Number(stock)
        this.brand = brand
    }
}