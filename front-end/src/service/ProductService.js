import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/products";
const LOGIN_API_BASE_URL = "http://localhost:8080/login";

const CHAT_API_BASE_URL = "http://localhost:8080/api/chat";
// 커밋용 주석
class ProductService {
  getProducts() {
    return axios.get(PRODUCT_API_BASE_URL);
  }

  getOneProduct(productId) {
    return axios.get(PRODUCT_API_BASE_URL + "/" + productId);
  }

  getChatList(userId){
    return axios.get(CHAT_API_BASE_URL + "/" + userId);
  }

  updateProduct(productId, product) {
    return axios.put(PRODUCT_API_BASE_URL + "/" + productId, product);
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCT_API_BASE_URL + "/" + productId);
  }

  login(userInfo){
    return axios.post(LOGIN_API_BASE_URL, userInfo);
  }

  
}

export default new ProductService();