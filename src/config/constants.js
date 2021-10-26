// 실제 돌아가고 있는 API 서버 주소와 (cloud 환경에서는 production이 들어감)
// 개발할 때 사용하는 localhost 주소
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://seoyeon-market-server.herokuapp.com"
    : "http://localhost:8080";
