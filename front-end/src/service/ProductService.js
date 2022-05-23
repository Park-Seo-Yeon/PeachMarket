import axios from "axios";
import { Navigate } from "react-router";

// const PRODUCT_API_BASE_URL = "http://43.200.34.51:8080/api/products/";
// const LOGIN_API_BASE_URL = "http://43.200.34.51:8080/login";
// const MYPAGE_API_BASE_URL = "http://43.200.34.51:8080/mypage";
// const CHAT_API_BASE_URL = "http://43.200.34.51:8080/api/chat";

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/products/";
const LOGIN_API_BASE_URL = "http://localhost:8080/login";
const MYPAGE_API_BASE_URL = "http://localhost:8080/mypage";
const CHAT_API_BASE_URL = "http://localhost:8080/api/chat";

class ProductService {
  getProducts() {
    return axios.get(PRODUCT_API_BASE_URL);
  }

  getOneProduct(productId) {
    return axios.get(PRODUCT_API_BASE_URL + productId);
  }

  getChatList(userId) {
    return axios.get(CHAT_API_BASE_URL + userId);
  }
  //프로필 업데이트 api
  updateUserProfile(userProfile) {
    return axios.post(
      MYPAGE_API_BASE_URL +
        "/update/" +
        localStorage.getItem("loginId"), userProfile,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCT_API_BASE_URL + "delete/" + productId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  login(userInfo) {
    return axios.post(LOGIN_API_BASE_URL, userInfo);
  }

  getMyPage() {
    return axios.get("http://localhost:8080/mypage", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  // 토큰을 재발급 받기 위한 요청을 보내는 부분
  // 이때는 'X-AUTH-TOKEN','REFRESH_TOKEN'에 토큰2개를 각각 담아서 보낸다.
  getRefreshToken() {
    axios.defaults.headers.common[
      "X-AUTH-TOKEN"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios.defaults.headers.common[
      "REFRESH_TOKEN"
    ] = `Bearer ${localStorage.getItem("refreshToken")}`;
    return axios.post("http://localhost:8080/refresh");
  }
}

export default new ProductService();
