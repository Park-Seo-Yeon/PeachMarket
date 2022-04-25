import axios from "axios";

const PRODUCCT_API_BASE_URL = "http://localhost:8080/api/products";

class ProductService {
  getProducts() {
    return axios.get(PRODUCCT_API_BASE_URL);
  }

  getOneProduct(productId) {
    return axios.get(PRODUCCT_API_BASE_URL + "/" + productId);
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCCT_API_BASE_URL + "/" + productId);
  }
}

export default new ProductService();
