import {
    Router
} from 'express'
import {
    CartsManager
} from '../utils.js'
import fs from 'fs'


const router = Router()

//traigo productos
const carts = await CartsManager.getCarts()

//metodo para agregar productos
router.post('/', async (req, res) => {
    try {

        const cart = req.body

        //crear id autoincrementable
        if (carts.length === 0) {
            cart.id = 1
        } else {
            cart.id = carts[carts.length - 1].id + 1
        }

        //verificacion de que se hayan puest los campos
        if (!cart.products) return res.status(400).send({
            status: 'error',
            message: "products doesn't exist"
        })

        carts.push(cart)
        await fs.promises.writeFile('./src/files/Carts.json', JSON.stringify(carts, null, '\t'))
        res.status(201).send({
            status: 'success'
        })


    } catch (error) {
        console.error(error)
    }

})
//traigo todos los productos, no lo pide el desafio pero era una mejor organizacion
router.get('/', (req, res) => {
    res.send(carts)
})

//traigo el cart que indique el usuario
router.get('/:cid', (req, res) => {

    const cartId = Number(req.params.cid)

    const cart = carts.find(c => c.id === cartId)


    if (!cart) return res.status(404).send({
        error: 'error',
        message: "Cart not found"
    })

    res.status(200).send(cart)

})



//agrego un producto al cart que elija el usuario
router.post('/:cid/product/:pid', async (req, res) => {

    try {

        const cartId = Number(req.params.cid)
        const productId = Number(req.params.pid)

        const cart = carts.find(c => c.id === cartId)

        if (cartId > carts.length || !cart) return res.status(400).send({
            status: 'error',
            message: "cart id doesn't exist"
        })

        function addPost(post) {

            const existingPost = cart.products.find(p => p.product === post);

            if (existingPost) {

                // Actualizar post existente

                existingPost.product = productId;

                existingPost.quantity += 1;
            } else {

                // Agregar nuevo post
                cart.products.push({
                    product: post,
                    quantity: 1
                });
            }
        }
        addPost(productId)
        await fs.promises.writeFile('./src/files/Carts.json', JSON.stringify(carts, null, '\t'))
        res.status(201).send({
            status: 'success'
        })

    } catch (error) {
        console.error(error)
    }

})



export default router