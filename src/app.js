import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import  __dirname   from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'


const app = express()

// app.use('/static', express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);
// app.use('/', productsRouter)
// app.use('/realtimeproducts', viewsRouter)
app.use('/', viewsRouter)


const server = app.listen(8080, () => console.log('Listening server on port 8080'))

const io = new Server(server)

io.on('connection', socket => {
    console.log('cliente conectado')
    // socket.on('showProducts', data => {
    //     console.log(data)
    // })
})