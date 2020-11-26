// const compraDAO = require(`../DAO/compra_dao`)()


// module.exports = () => {
//     const controller = {}
    
//     controller.listarEstoque = (req, res) => {
//         if (req.body != undefined) {
//             compraDAO.listar()
//                 .then((value) => { res.status(201).send(value) })
//                 .catch((err) => { res.status(500).send(err) })
//         } else res.status(403).send(`Informe o  produto`)
//     }

//     controller.addCarrinho = (req, res) => {

//         if (req.body != undefined) {
//             compraDAO.AdicionarItemNoCarrinho(req.body)
//                 .then((value) => { res.status(201).send(value) })
//                 .catch((err) => { res.status(500).send(err) })
//         } else res.status(403).send(`Indisponivel`)
//     }

//     controller.FinalizarCarrinho = (req, res) => {
//         if (req.body != undefined) {
//             compraDAO.FinalizarCompra(req.body)
//                 .then((value) => { res.status(201).send(value) })
//                 .catch((err) => { res.status(500).send(err) })
//         } else res.status(403).send(`Indisponivel`)
//     }

//     controller.DeletarItemCarrinho = (req, res) => {
//         if (req.body != undefined) {
//             compraDAO.DeletarItemCarrinho(req.body)
//                 .then((value) => { res.status(201).send(value) })
//                 .catch((err) => { res.status(500).send(err) })
//         } else res.status(403).send(`Indisponivel`)
//     }
    
//     return controller;
// }