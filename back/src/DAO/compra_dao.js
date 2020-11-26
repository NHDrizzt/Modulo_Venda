
/*
const mysql = require('../mysql')
const connectionPool = require('../mysql')
const { restart } = require('nodemon');

module.exports = () => {

    const DAO = {}

    DAO.listar = async (body) => {
        try{
            const query = 'SELECT * FROM produto_estoque';
            const result = await mysql.execute(query, [])
            return result
        }
        catch (error){
            console.log(error)
            return{error: error}
        }
    }

    DAO.AdicionarItemNoCarrinho = async (body) => {
        try{
            let idcarrinho;
            //verifica o carrinho se ja existe... existe? busca o carrinho / nao? cria um novo carrinho
            
            if(body.usuario_id != undefined){
            const verificaCarrinho = await mysql.execute('select * from carrinho_de_compras where usuario_id = ? and EmAndamento = 1', [body.usuario_id])
            
                if(verificaCarrinho.length > 0){
                    idcarrinho = verificaCarrinho[0].id
                }
                else{
                    const insertCarrinho = await mysql.execute('insert into carrinho_de_compras (usuario_id) values (?)', [body.usuario_id])
                    idcarrinho = insertCarrinho.insertId
                }
            }
            // primeiro verifica se a quantidade q esta vindo possui no estoque
            const qtdProduto = await mysql.execute('select quantidade_em_estoque, p.preco from produto_estoque pe inner join produto p ON pe.produto_idProduto = p.idProduto where pe.estoque_idEstoque = ? and pe.produto_idProduto = ?;', 
            [body.idEstoque, body.idProduto])
            

            if(body.quantidade > qtdProduto[0]){
                throw "Quantidade indisponivel"
            }
            else 
            {
                
                // possui? cria  um item no item_carrinho e vincula esse item ao carrinho_id
                const insertItemCart = await mysql.execute('insert into item_carrinho (quantidade, preco, produto_idProduto, carrinho_de_compras_id, estoque_idEstoque) values (?, ?, ?, ?, ?)', [body.quantidade, qtdProduto[0].preco, body.idProduto, idcarrinho, body.idEstoque])
            
            }          
        }
        catch (error){
            console.log(error)
            return{error: error}
        }
    }
    
    DAO.FinalizarCompra = async (body) => {
        try{
            //const check = await mysql.execute('select EmAndamento from carrinho_de_compras ')
            //escolha do metodo de pagamento.. 
            //calculo preco final
            const preco_final = await mysql.execute('select sum(preco * quantidade) as preco from item_carrinho where carrinho_de_compras_id = ?;', [body.carrinho_de_compras_id])


            //fazer um forof dos elementos da tabela item carrinho para verificar o id do produto e comparar 


            // verifica se ja existe um pedido igual na tabela de pedidos

            //criar um pedido a partir do carrinho de compras (vincular)
            const vincularCarrinhoNoPedido = await mysql.execute('insert into pedido' + 
            '(data_entrega, prazo_pagamento, tipo_pagamento, carrinho_de_compras_id, carrinho_de_compras_usuario_id) values (?,?,?,?,?)', 
            ["27/10/2020", "20/10/2020", body.tipo_pagamento, body.carrinho_de_compras_id, body.usuario_id]
            )
            //encontrar o pedido para gerar a nota fiscal
            const encontraPedido = await mysql.execute('select * from pedido where carrinho_de_compras_id =?', [body.carrinho_de_compras_id])

            //gerar a nota fiscal da compra
            const nota_fiscal = await mysql.execute('insert into nota_fiscal' + 
            '(data, preco_final, pedido_idpedido, pedido_carrinho_de_compras_id, pedido_carrinho_de_compras_usuario_id) values (CURRENT_TIMESTAMP(),?,?,?,?)',
            [ preco_final[0].preco, encontraPedido[0].idpedido, encontraPedido[0].carrinho_de_compras_id, encontraPedido[0].carrinho_de_compras_usuario_id])

            //movimentação do estoque

            // soma quantidade total q tem no banco e a quantidade q o cara ta pedindo sendo a mesma iD. Bateu e pq tem e vai venda
            const SelQtdTotalEmEstoque = await mysql.execute('select sum(quantidade_em_estoque) from produto_estoque where produto_idProduto = ?;', [body.produto_idProduto])
            const SelQtdTotalPedido = await mysql.execute('select sum(quantidade) as soma from item_carrinho where produto_idProduto = ?;', [body.produto_idProduto])
            
            if(SelQtdTotalEmEstoque[0] >= SelQtdTotalPedido[0]){
                // select de todos as linhas q possuem o item q o cara ta pedindo no estoque 
                let c 
                let d
               
                const listItensCarrinho = await mysql.execute('select * from produto_estoque where produto_idProduto = ?;', [body.produto_idProduto])
                for (const element of listItensCarrinho) {
                    let a = element.quantidade_em_estoque
                    let b = SelQtdTotalPedido[0].soma              
                    c = a - d

                    if(c > 0){
                        //update por linha da quantidade restante naquele estoque
                       
                        const upd2 = await mysql.execute('update produto_estoque SET quantidade_em_estoque = ? where idproduto_estoque = ?', [c, element.idproduto_estoque])
                        const upd3 = await mysql.execute('update carrinho_de_compras SET EmAndamento = 0')
                        throw "Finalizado"
                    }
                    else{
                        //update aki do element.quantidade_em_estoque para 0
                        const upd = await mysql.execute('update produto_estoque SET quantidade_em_estoque = 0 where produto_idProduto = ?', [ body.produto_idProduto])
                        d = b - a
                    }
                    
                    
                }
            }
        }
        catch (error){
            console.log(error)
            return{error: error}
        }
    }
    





    DAO.RemoverItemCarrinho = async (body) => {
        try{
            
            var query2 = `SELECT * FROM item_carrinho WHERE iditem_carrinho = ?`;
            var result2 = await mysql.execute(query2, [req.params.id])
            if (result2.length != 0) {
                const query = ` DELETE FROM item_carrinho WHERE iditem_carrinho = ?`
                const result = await mysql.execute(query, [req.params.id])
                if (result.length == 0) {
                    return res.status(404).send({ message: ' Não encontrado ' })
                }
                return res.status(202).send(response);
            }
         }
        catch (error){
            console.log(error)
            return{error: error}
        }
    }

    



    return DAO;
}

*/