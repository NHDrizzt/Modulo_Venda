// const mysql = require('../mysql');
// const jwt = require('jsonwebtoken');

// module.exports = () => {
//     const controller = {}

//     controller.ListarUser = async (req, res) => {
//         try{
//             const query = 'SELECT * FROM usuario';
//             const result = await mysql.execute(query, [])
//             const response = {
//                 message: 'Lista dos Usuarios: '
//             }
//             if(result == undefined){
//                 const er = new Error();
//                 er.message = "Não existe valores"
//                 er.code = "ERR001"
//                 return res.status(500).send({response: er})
//             }
//             return res.status(200).send({ response: response, result: result });
//         }
//         catch (error){
//             console.log(error)
//             return{error: error}
//         }
//     }

//     controller.createUser = async (req, res, next) => {

//         try {
//             var query = `SELECT * FROM usuario WHERE email = ?`;
//             var result = await mysql.execute(query, [req.body.email]);
//             if (result.length > 0) {
//                 return res.status(409).send({ message: 'Usuário já cadastrado' })
//             }
            
//             query = 'INSERT INTO usuario (nome, email, senha) VALUES (?,?,?)';
//             const results = await mysql.execute(query, [req.body.nome, req.body.email, req.body.senha]);

//             const response = {
//                 message: 'Usuário criado com sucesso',
//                 createdUser: {
//                     userId: results.insertId,
//                     nome: req.body.nome,
//                     email: req.body.email
//                 }
//             }
//             return res.status(201).send(response);
    
//         } catch (error) {
//             return res.status(500).send({ error: error });
//         }
//     };

//     controller.Login = async (req, res, next) => {

//         try {
//             const query = `SELECT * FROM usuario WHERE email = ?`;
//             var results = await mysql.execute(query, [req.body.email]);
            
//             if (results.length < 1) {
//                 return res.status(401).send({ message: 'Falha na autenticação' })
//             }
            
//             if (req.body.email == results[0].email && req.body.senha == results[0].senha) {
                
//                 const token = jwt.sign({
//                     email: results[0].email,
//                     nome: results[0].nome
//                 },
                
//                 process.env.ACCESS_TOKEN_SECRET,{
//                     expiresIn: "1h"
//                 });
//                 return res.status(200).send({message: 'Autenticado com sucesso', token: token});
//             }

//             else{
//                 return res.status(401).send({ message: 'Falha na autenticação tlk' })  
//             }
    
//         } catch (error) {
//             return res.status(401).send({ message: 'Falha na autenticação aki' });
//         }
//     };

//     return controller
// }