import axios from 'axios';

class Api {
  static headers() {
    return {
    'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  static get(route, params) {
    return this.xhr(route, params, 'GET');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static xhr(route, params, verb) {
    var dataOption = {};
    if (params && verb === 'GET') {
      dataOption['params'] = params;
    } else {
      dataOption['data'] = params;
    }
        
    let options = Object.assign({ method: verb, url: route }, dataOption );
    options.headers = Api.headers();

    return axios(options)
      .catch(function (error) {
        if (error.response) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          throw new Error("Unable to connect to the Internet.");
        } else {
          throw new Error(error.message);
        }
    })
    .then(function(response) {
      return response;
    })
    .then(handleErrors)
    .then((responseJson) => {
      return responseJson.data;
    })
  }
}

function handleErrors(response) {
  if (response.status) {
    switch(response.status) {
      case 401:
        throw new Error(response.message);
        break;
      case 403:
        throw new Error(response.message);
        break;
      case 400:
        throw new Error(response.message);
        break;    
    }
  }
  return response;
}

export default Api;
