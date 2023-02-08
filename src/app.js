import express from 'express'
import  { __dirname }  from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/static', express.static(`${__dirname}/public`));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);



// const products = await manejadorEventos.getProducts()

// app.get('/products', async (req, res) => {
//     const limit = Number(req.query.limit)

//     if (!limit) return res.send({
//         products
//     })

//     const filterLimit = products.filter(p => p.id <= limit)

//     res.send({filterLimit})
// })

// app.get('/products/:pid', async (req, res) => {
//     const idProduct = Number(req.params.pid)

//     const product = products.find(p => p.id === idProduct)
//     if (!product) return res.send({
//         error: 'Usuario no encontrado'
//     })

//     res.send(product)
// })

app.listen(8080, () => console.log('Listening on port 8080'))




const inicializador = async () => {
    await manejadorEventos.addProduct("producto1", "Este es un producto prueba", 200, "Sin imagen", "1a", 25)
    await manejadorEventos.addProduct("producto2", "Este es un producto prueba", 250, "Sin imagen", "2b", 2)
    await manejadorEventos.addProduct("producto3", "Este es un producto prueba", 210, "Sin imagen", "3c", 10)
    await manejadorEventos.addProduct("producto4", "Este es un producto prueba", 120, "Sin imagen", "4d", 41)
    await manejadorEventos.addProduct("producto5", "Este es un producto prueba", 20, "Sin imagen", "5e", 50)
    await manejadorEventos.addProduct("producto6", "Este es un producto prueba", 400, "Sin imagen", "6f", 50)
    await manejadorEventos.addProduct("producto7", "Este es un producto prueba", 230, "Sin imagen", "7g", 25)
    await manejadorEventos.addProduct("producto8", "Este es un producto prueba", 500, "Sin imagen", "8j", 12)
    await manejadorEventos.addProduct("producto9", "Este es un producto prueba", 520, "Sin imagen", "9i", 31)
    await manejadorEventos.addProduct("producto10", "Este es un producto prueba", 100, "Sin imagen", "10j", 65)
    // await manejadorEventos.getProductById(1)
    // await manejadorEventos.getProductById(0)
    // await manejadorEventos.updateProduct(1, 250)
    // await manejadorEventos.getProducts()


}
// inicializador()