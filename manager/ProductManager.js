import fs from 'fs'

export default class ProductManager {
        constructor() {
            this.products = [];
            this.path = './files/Productos.json'
        }
    
        //funcion para agregar el producto
        addProduct = async (title, description, price, thumbnail, code, stock) => {
            try {
    
                const product = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
    
                //crear id autoincrementable
                if (this.products.length === 0) {
                    product.id = 1
                } else {
                    product.id = this.products[this.products.length - 1].id + 1
                }
    
                const codeIndex = this.products.findIndex(e => e.code === product.code) // identifico si hay un code repetido
    
                const values = Object.values(product) // saco los values del producto asi puedo verificar que no esten vacios
    
                const valuesString = values.filter(e => typeof e == 'string') // filtro los values por string ya que si es un numero me tira error el .trim()
    
                const checkTrim = valuesString.findIndex(e => e.trim() === "") // uso el .trim() para eliminar margenes de error
    
    
    
                //validar code repetido o espacios vacios
                if (codeIndex === -1 && checkTrim === -1) {
                    this.products.push(product)
                } else {
                    codeIndex !== -1 && console.error('El identificador code ya esta en otro producto')
                    checkTrim !== -1 && console.error('Hay un campo vacio')
                }
    
    
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    
                return product
    
            } catch (error) {
                console.log(error)
            }
    
        }
    
        //mostrar los productos en consola
        getProducts = async () => {
            try {
    
                if (fs.existsSync(this.path)) {
                    const data = await fs.promises.readFile(this.path, 'utf-8')
                    const products = JSON.parse(data)
                    return products
                } else {
                    return []
                }
    
            } catch (error) {
                console.log(error)
            }
        }
    
        //buscar producto por id
        getProductById = async (idProduct) => {
            const productFind = this.products.find(e => e.id === idProduct)
            if (productFind == undefined) {
                console.error('Not found')
                return
            } else {
                const data = await fs.promises.readFile(this.path, 'utf-8')
                let products = JSON.parse(data)
                const find = products.find(e => e.id === idProduct)
                console.log('El producto buscado es:')
                console.log(find)
                return find
            }
        }
    
        updateProduct = async (idProduct, key) => {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            let products = JSON.parse(data)
            let productIndex = products.findIndex(e => e.id === idProduct)
            if (productIndex === -1) {
                console.log('Produdcto no encontrado')
                return
            }
            let product = products[productIndex]
            const newProduct = {
                ...product,
                newPrice: key
            }
            await this.deleteProduct(newProduct.id)
            this.products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
        }
    
        deleteProduct = async (idProduct) => {
            try {
                let data = await fs.promises.readFile(this.path, 'utf-8')
                let products = JSON.parse(data)
                let findId = products.find(e => e.id === idProduct)
    
                if (findId) {
                    const filter = products.filter(e => e.id !== idProduct)
                    this.products = filter
                    return filter
                } else {
                    console.error('El id seleccionado no tiene ningun producto asociado')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
