import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";
import { Button, message } from "antd";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(function () {
    getProduct();
  }, []);
  //console.log(product);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  // 구매하기 버튼을 눌렀을 때 페이지 넘어가는 통신 필요
  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
        // 새로고침을 실행해보자
        getProduct();
      })
      .catch((error) => {
        console.log(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        {/* node 서버에서 불러올거니까 ${ }안에 넣어주고 벡틱 써주기 */}
        <img src={`${API_URL}/${product.imageurl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}원</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          // 구매 후에는 구매 버튼 비활성화 시키기
          disabled={product.soldout === 1 ? true : false}
        >
          재빨리 구매하기
        </Button>
        {/* pre 태그를 div 대신 넣으면 줄바꿈까지 보여준다 */}
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
