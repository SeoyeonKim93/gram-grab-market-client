import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants.js";
import { Carousel } from "antd";
dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  // useEffect : 안에 있는 첫번째 인자는 두번째 인자가 변하지 않는한 한번만 랜더링 된다.
  // useEffect 안에 axios 안넣어주면 주한대로 setProduct가 통신되는 오류 발생
  React.useEffect(function () {
    axios
      // 방법1. Mockserver 이용하기
      // .get(
      //   "https://0a6a94d4-5496-4870-a65b-ba04a9d2458f.mock.pstmn.io/products"
      // )
      // 방법2. node 서버 이용하기
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        // useState에서 초기값이 []이니까 여기서 먼저 update한번 해주기
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생:", error);
      });

    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.error("에러발생 : ", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageurl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product-list">
        {/* 배열로 부터 순회를 하면서 return 안을 내보냄 */}
        {products.map(function (product, index) {
          return (
            <div className="product-card">
              {/* 결제 완료된 상품 흐리게 만들기 */}
              {product.soldout === 1 && <div className="product-blur" />}
              <Link
                style={{ color: "inherit" }}
                className="product-link"
                to={`/products/${product.id}`}
              >
                <div>
                  <img
                    className="product-img"
                    src={`${API_URL}/${product.imageurl}`}
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                      />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product-date">
                      {dayjs(product.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
