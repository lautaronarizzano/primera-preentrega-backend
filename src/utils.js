import path from 'path'
import { fileURLToPath } from 'url'
import ProductManager from '../manager/ProductManager.js'
import CartManager from '../manager/CartManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const productsManager = new ProductManager(path.join(__dirname, 'Productos.json'))
const CartsManager = new CartManager(path.join(__dirname, 'Carts.json'))

export { __dirname, productsManager, CartsManager }