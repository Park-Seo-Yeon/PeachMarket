import axios from "axios";

const PRODUCCT_API_BASE_URL = "http://localhost:8080/api/products";

class ProductService {
  getProducts() {
    return axios.get(PRODUCCT_API_BASE_URL);
  }
}

export default new ProductService();
