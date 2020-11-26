import express from 'express';
import Product from '../models/productModel';

const router = express.Router();

router.get("/", async (req,res) => {
    try{
    const produtos = await Product.find({});
    res.send(produtos);
  }catch(error){
    console.log(error)
  }
});

router.get("/:id", async (req,res) => {
  try{
  const produtos = await Product.findOne({_id: req.params.id});
  if(produtos){
  res.send(produtos);
  }
  else{
    res.status(404).send({message})
  }
}catch(error){
  console.log(error)
}
});

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'Novo Produto Criado', data: newProduct });
  }
  return res.status(500).send({ message: ' Erro ao Criar Produto.' });
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById({_id: productId})
  if(product){
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(201)
        .send({ message: 'Novo Produto Criado', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Erro ao dar Update de Produto.' });
});


router.delete("/:id", async (req, res) =>
{
  const deletedProduct = await Product.findById(req.params.id)
  if(deletedProduct){
    await deletedProduct.remove();
    res.send({message: "Removido"})
  }
  else{
    res.send("Erro ao deletar");
  }
})

export default router;