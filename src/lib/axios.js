import axios from "axios";

function proxyResponse(statusCode, data) {
  return {
    statusCode,
    data
  };
}

const Gateway = {
  async request(endPoint, method, payLoad) {
    switch (method) {
      case "get":
      default: {
        try {
          const response = await axios.get(endPoint);
          return proxyResponse(200, response.data);
        } catch (error) {
          return proxyResponse(500, error);
        }
      }
      case "put": {
        try {
          const response = await axios.put(endPoint, payLoad);
          return proxyResponse(response.statusCode, response.data);
        } catch (error) {
          return proxyResponse(500, error);
        }
      }
      case "post": {
        try {
          const response = await axios.post(endPoint, payLoad);
          return proxyResponse(response.statusCode, response.data);
        } catch (error) {
          return proxyResponse(500, error);
        }
      }
    }
  }
};

export default Gateway;
