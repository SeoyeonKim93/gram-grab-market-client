import {
  Divider,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../config/constants.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageurl, setImageurl] = useState(null);
  // 페이지 이동을 위한 준비
  const history = useHistory();
  const onSubmit = (values) => {
    console.log(values);
    // value를 활용해서 우리의 API 서버로 통신
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageurl: imageurl,
      })
      .then((result) => {
        console.log(result);
        // 이전 페이지로 돌아가기
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        message.error(`에러가 발생했습니다.${error.message}`);
      });
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageurl = response.imageurl;
      // 받은 image에 대한 정보를 'useState' 라이브러리를 update해서 저장
      setImageurl(imageurl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            // onChage : image의 경로를 받아서 처리하는 함수
            onChange={onChangeImage}
          >
            {
              // jsx 문법 사용
              // imageurl이 있을 때 없을 때 무엇을 보여주려는 지 적어준다
              imageurl ? (
                <img id="upload-img" src={`${API_URL}/${imageurl}`} />
              ) : (
                <div id="upload-img-placeholder">
                  <img src="/images/icons/camera.png" />
                  <span>이미지를 업로드 해주세요.</span>
                </div>
              )
            }
          </Upload>
        </Form.Item>
        {/* 선을 하나 그어주는 역할 : Divider */}
        <Divider />
        <Form.Item
          label={<div className="upload-label">판매자 명</div>}
          name="seller"
          rules={[{ required: true, message: "판매자 이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="판매자 이름을 입력해주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload-label">상품 이름</div>}
          name="name"
          rules={[{ required: true, message: "상품 이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품 이름을 입력해주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload-label">상품 가격</div>}
          name="price"
          rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
        >
          <InputNumber
            defaultValue={0}
            className="upload-price"
            size="large"
            placeholder="상품 가격을 입력해주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload-label">상품 소개</div>}
          name="description"
          rules={[{ required: true, message: "상품 소개를 적어주세요" }]}
        >
          <Input.TextArea
            id="product-description"
            size="large"
            showCount={true}
            maxLength={300}
            placeholder="상품 가격을 입력해주세요"
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            상품 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
