import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';


function HomeScreen (props) {

    const productList = useSelector(state => state.productList);
    const {products,loading,error} = productList;
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(listProducts());
      return () => {

        // <div class="a-cardui-body">
        //   <a class="a-link-normal center-image aok-block" href="/Samsung-Intel%C2%AE-Dual-Core-Windows-500GB/dp/B08BB91X67?smid=A1ZZFT5FULY4LN">
        //     <div class="a-image-container a-dynamic-image-container" style="height:240px;"><img alt="Samsung Book E20 Intel Dual-Core, Windows 10 Home, 4GB, 500GB" src="https://m.media-amazon.com/images/I/41b79MAHRjL._AC_SY480_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41b79MAHRjL._AC_SY480_.jpg"></div>
        //   </a>
        //   <span class="a-size-small ah-deal-badge-black-friday truncate-1line">Black Friday</span>
        // <p class="a-spacing-none"><span class="a-price-range deal-price-block"><span class="a-price min-deal-price" data-a-size="l" data-a-color="base"><span class="a-offscreen">R$2.275,00</span><span aria-hidden="true"><span class="a-price-symbol">R$</span><span class="a-price-whole">2.275<span class="a-price-decimal">,</span></span><span class="a-price-fraction">00</span></span></span><span class="a-price a-text-price deals-image-strikethrough list-price" data-a-size="b" data-a-strike="true" data-a-color="tertiary"><span class="a-offscreen">R$2.429,99</span><span aria-hidden="true">R$2.429,99</span></span></span></p>
        // <span class="a-size-base a-color-base truncate-1line deal-title">Samsung Book E20 Intel Dual-Core, Windows 10 Home, 4GB, 500GB</span>
        // </div>
        //
      }
    }, [])

    return loading? <div> Loading...</div> :
    error? <div>{error}</div> :
    
    <ul className="products">
    {
      products.map(product => 
      <li key={product._id}>
        <div className="product">
        <Link to={'/product/' + product._id}>
          <img className="product-image" src={product.image} alt="product"></img>
          </Link>
          <div className="product-name">
            <Link to={'/product/' + product._id}>{product.name}</Link>
          </div>
          <div className="product-brand">{"Marca: "+ product.brand}</div>
          <div className="product-price">{"R$ " + product.price }</div>
           <div className="product-rating">{"Estrelitas: "+ product.rating}</div>
        </div>
      </li>)
    }
  </ul>
}

export default HomeScreen;