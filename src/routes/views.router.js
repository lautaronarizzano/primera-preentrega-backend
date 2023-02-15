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
        res.render('realTimeProducts', {products})
    }else {
        const limitedProducts = products.slice(0, limit);
        res.render('realTimeProducts', {limitedProducts});
    }
})



export default router