const express = require('express')
const app = express()
const koneksi = require('./config/database')
const Product = require('./models/Product')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

koneksi.sync().then(() => { console.log('Database terhubung') })

app.get('/api/products', async (req, res) => {
    const product = await Product.findAll()
    return res.json(product)
})

app.post('/api/products', async (req, res) => {
    await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      stock: req.body.stock
})

    //   return res.status(201).json({ massage: 'Produk berhasil ditambahkan'})
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
    res.redirect('/')
})

app.post('/api/products/update/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      return res.status(404).json({ massage: 'Produk tidak ditemukan'})
    }
    await product.update({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      stock: req.body.stock
    })
    //   return res.json({ message: 'Produk berhasil diperbarui' })
    res.redirect('/')
})
// detail
app.get('/api/products/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    if (!product){
    return res.status(404).json({ massage: 'Produk tidak ditemukan'})
    }
    return res.json(product)
})

app.post('/api/products/delete/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    if (!product){
        return res.status(404).json({ massage: 'Produk tidak ditemukan'})
    }
    await product.destroy()
    // return res.json({ massage: 'Produk berhasil dihapus'})
    res.redirect('/')
})

// front-end
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/tambah', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tambah.html'))
})
app.get('/ubah', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ubah.html'))
})

// app.listen(3000, () => {
//     console.log('Server berjalan di http;//localhost:3000')
// })