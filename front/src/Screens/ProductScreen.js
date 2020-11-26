import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen (props) {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error , product } = productDetails;
    

    useEffect(() => {
        dispatch(detailsProduct(productId));
        return () => {
          //
        }
      }, [])

      const handleAddToCart = () => {
          props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
      }

    return  <div>
            <div className="back-to-result">
                <Link to="/">Voltar</Link>
            </div>
            {
                loading ? <div> Loading...</div> :
                error ? <div>{error}</div> :
                (
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt="product"></img>
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                {product.rating} Estrelitas ({product.numReviews} Avaliações)
                            </li>
                            <li>
                                <b>{product.price}</b>
                            </li>
                            <li>
                                Descrição:
                                <div>
                                    <h4>{product.description}</h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Preço: {product.price}
                            </li>
                            <li>
                                Status: {product.countInStock>0? "Em estoque" : " Indisponível"}
                            </li>
                            <li>
                                Qtd: <select
                                        value={qty}
                                        onChange={(e) => {
                                        setQty(e.target.value);
                                        }}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                        ))}
                                    </select>
                            </li>
                            <li>
                                {product.countInStock>0?
                                <button onClick={handleAddToCart} className="button">Adicionar ao Carrinho</button>
                                :
                                <div>Fora de Estoque.</div>
                                }
                            </li>
                        </ul>
                    </div>
                </div> 
                )
            }
    </div>
}

export default ProductScreen;