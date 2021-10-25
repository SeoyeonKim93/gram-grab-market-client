import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(function () {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  //console.log(product);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

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
        {/* pre 태그를 div 대신 넣으면 줄바꿈까지 보여준다 */}
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
