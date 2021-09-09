import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
function MainPage() {
  const [products, setProducts] = React.useState([]);
  // useEffect : 안에 있는 첫번째 인자는 두번째 인자가 변하지 않는한 한번만 랜더링 된다.
  // useEffect 안에 axios 안넣어주면 주한대로 setProduct가 통신되는 오류 발생
  React.useEffect(function () {
    axios
      .get(
        "https://0a6a94d4-5496-4870-a65b-ba04a9d2458f.mock.pstmn.io/products"
      )
      .then(function (result) {
        const products = result.data.product;
        // useState에서 초기값이 []이니까 여기서 먼저 update한번 해주기
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생:", error);
      });
  }, []);

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product-list">
          {/* 배열로 부터 순회를 하면서 return 안을 내보냄 */}
          {products.map(function (product, index) {
            return (
              <div className="product-card">
                <Link className="product-link" to={`/products/${index}`}>
                  <div>
                    <img className="product-img" src={product.imageurl} />
                  </div>
                  <div className="product-contents">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}원</span>
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                      />
                      <span>{product.seller}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default MainPage;
