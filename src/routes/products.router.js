import {
    Router
} from 'express'
import fs from 'fs'



const router = Router()


const data = await fs.promises.readFile('./src/files/Products.json', 'utf-8')
    const products = JSON.parse(data)

router.get('/', async (req, res) => {
        
    const limit = Number(req.query.limit)

    if (!limit){
        // res.send({products})
        res.render('home', {products})
    }else {
        const limitedProducts = products.slice(0, limit);
        res.render('home', {limitedProducts});
    }
})


router.get('/:pid', (req, res) => {
    const idProduct = Number(req.params.pid)

    const product = products.find(p => p.id === idProduct)
    if (!product) return res.status(404).send({
        error: 'error',
        message: "Product not found"
    })

    res.render('home', {product})
})

router.post('/', async (req, res) => {
    try {

        const product = req.body

        product.status = true

        const values = Object.values(product)
        const valuesString = values.filter(e => typeof e == 'string')
        const checkTrim = valuesString.findIndex(e => e.trim() === "")
        const codeIndex = products.findIndex(e => e.code === product.code)

        if (checkTrim !== -1) return res.status(404).send({
            status: 'error, los valores no estan bien implementados'
        })
        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) return res.status(400).send({
            status: 'error',
            message: 'Incomplete values'
        })
        if (codeIndex !== -1) return res.status(400).send({
            status: 'error',
            message: 'Product already exist'
        })
        //crear id autoincrementable
        if (products.length === 0) {
            product.id = 1
        } else {
            product.id = products[products.length - 1].id + 1
        }
        products.push(product)
        await fs.promises.writeFile('./src/files/Products.json', JSON.stringify(products, null, '\t'))
        res.status(200).send({
            status: "success"
        })

    } catch (error) {
        console.error(error)
    }
})

router.put('/:pid', async (req, res) => {
    try {

        const product = req.body
        const productId = Number(req.params.pid)

        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) return res.status(400).send({
            status: 'error',
            message: 'Incomplete values'
        })

        const newProduct = {
            id: productId,
            ...product
        }

        const index = products.findIndex(p => p.id === productId)

        if (index !== -1) {
            products[index] = newProduct
            await fs.promises.writeFile('./src/files/Products.json', JSON.stringify(products, null, '\t'))
            res.status(200).send({
                status: 'success',
                message: 'Product updated'
            })
        } else {
            res.status(404).send({
                status: 'error',
                message: "Product not found"
            })
        }

    } catch (error) {
        console.error(error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {

        const productId = Number(req.params.pid)
        const index = products.findIndex(p => p.id == productId)

        if (index !== -1) {
            products.splice(index, 1)
            await fs.promises.writeFile('./src/files/Products.json', JSON.stringify(products, null, '\t'))
            res.status(200).send({
                status: 'success',
                message: 'Product deleted'
            })
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Product not found'
            })
        }
    } catch (error) {
        console.error(error)
    }
})




export default router