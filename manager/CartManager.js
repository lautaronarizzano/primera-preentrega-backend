import fs from 'fs'

export default class CartManager {
    constructor() {
        this.carts = []
        this.path = './files/Cart.json'
    }

    getCarts = async () => {
        try {

            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const carts = JSON.parse(data)
                return carts
            } else {
                return []
            }

        } catch (error) {
            console.error(error)
        }
    }
}