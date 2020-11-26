import dotenv from 'dotenv';
import data from './data';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import userRoute from './routes/user_routes';
import productRoute from './routes/produtoRoute';


dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const express = require('express')
const app = express()
app.use(bodyParser.json())

app.use('/api/products', productRoute);
app.use("/api/users", userRoute)
app.use(express.json())
// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id == productId);
//     if(product){
//         res.send(product)
        
//     }
//     else{
//         res.status(404).send({msg: "Não Encontrado"})
//     }
// })
app.use((req, res, next) => {
    const erro = new Error('Não encontrado Nadaa');
    erro.status = 404;
    next(erro);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

app.listen(3333)




