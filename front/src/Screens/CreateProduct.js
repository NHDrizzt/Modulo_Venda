import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userAction';
import { listProducts, saveProduct, deleteProduct } from '../actions/productActions';



function ProductsScreen(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setcountInStock] = useState('');
  const [description, setDescription] = useState('');

  const productList = useSelector(state => state.productList);
  const {loading, products, error} = productList;


  const productSave = useSelector(state => state.userSignin);
  const {loading: loadingSave, sucess: sucessSave, error: errorSave } = productSave

  const productDelete = useSelector(state => state.productDelete);
  const {loading: loadingDelete, sucess: sucessDelete, error: errorDelete } = productDelete

  const dispatch = useDispatch();


  useEffect(() => {
    if(sucessSave){
      setModalVisible(false);
    }
    dispatch(listProducts())
    return () => {
      //
    };
  }, [sucessSave, sucessDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setcountInStock(product.countInStock);
    setDescription(product.description);
    
  }

  const submitHandler = (e) => {
    e.preventDefault();
   dispatch(saveProduct({_id: id, name, price, image, brand, category, countInStock, description })); 
  }

  const deletaIssoAiMAN  = (product) => {
    dispatch(deleteProduct(product._id));
  }


  return <div className="content content-margined">
    <div className="product-header">
      <h3>Produtos</h3>
      <button onClick={() => openModal({})}>Criar Produto</button>
    </div>
    {modalVisible &&
    
  
  <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Criar Produto</h2>
        </li>
        <li>
          {loadingSave && <div>Loading...</div>}
          {errorSave && <div>{errorSave}</div>}
        </li>

        <li>
          <label htmlFor="name">
            Nome
          </label>
          <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
          </input>
        </li>

        <li>
          <label htmlFor="price">
            Preço
          </label>
          <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}>
          </input>
        </li><li>
          <label htmlFor="image">
            image
          </label>
          <input type="text" name="image" value={image}id="image" onChange={(e) => setImage(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="brand">
            marca
          </label>
          <input type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="category">
            categoria
          </label>
          <input type="text" name="category"  value= {category}id="category" onChange={(e) => setCategory(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="countInStock">
            Numero Em Estoque
          </label>
          <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setcountInStock(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="description">
            descrição
          </label>
          <textarea type="text" name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}>
          </textarea>
        </li>

        <li>
          <button type="submit" className="button primary" >{id?"Update": "Criar"}</button>
        </li>    
        <li>
          <button type="button" className="button secondary" onClick={()=>setModalVisible(false)}>Voltar</button>
        </li>     
      </ul>
    </form>
  </div>
  }
  <div className="product-list">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>PREÇO</th>
            <th>CATEGORIA</th>
            <th>MARCA</th>
            <th>AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <button onClick={() => openModal(product)}>Editar</button>
                <button onClick={() => deletaIssoAiMAN(product)}>Deletar</button>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  </div>
}
export default ProductsScreen;