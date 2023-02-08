import { Router } from 'express'
import { CartsManager } from '../utils.js'
import fs from 'fs'


const router = Router()

const carts = await CartsManager.getCarts()

router.post('/', async (req, res) => {
    try {
        
        const cart = req.body

        //crear id autoincrementable
        if (carts.length === 0) {
            cart.id = 1
        } else {
            cart.id = carts[carts.length - 1].id + 1
        }
    
        if(!cart.products) return res.status(400).send({status: 'error', message: "products doesn't exist"})

        carts.push(cart)
        await fs.promises.writeFile('./src/files/Carts.json', JSON.stringify(carts, null, '\t'))
        res.status(200).send({status: 'success'})
    

    } catch (error) {
        console.error(error)
    }

})
router.get('/', (req, res) => {
    res.send(carts)
})

router.get('/:cid', (req, res) => {

    const cartId = Number(req.params.cid)

    const cart = carts.find(c => c.id === cartId)


    if (!cart) return res.status(404).send({error: 'error', message: "Cart not found"})

    res.send(cart)

})

router.post('/:cid/product/:pid', (req, res) => {

    const cartId = Number(req.params.cid)
    const productId = Number(req.params.pid)

    const cart = carts.find(c => c.id === cartId)

    if(cartId > carts.length || !cart) return res.status(404).send({status: 'error', message: "cart id doesn't exist"})
    

    const newProduct = {
        product: productId,
    }
    if (!newProduct.quantity) {
        newProduct.quantity = 1
    } 
    // else {
    //     newProduct.quantity = cart.products[cart.products.length - 1].quantity + 1
    // }
    
    cart.products.push(newProduct)
    res.send({status: 'success'})
})

export default router