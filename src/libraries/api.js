import {getLanguage} from './locale';
import download from 'downloadjs';

export default async(method, endpoint, parameters, headers, response) => {
  const params = new URLSearchParams();

  if(method === 'GET' && parameters) {
    for(let param in parameters) {
      params.set(param, parameters[param]);
    }
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': getLanguage(),
      'x-api-token': process.env.REACT_APP_API_TOKEN,
      ...headers,
    },
    method,
  };

  const token = localStorage.getItem('token');
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if(method !== 'GET') {
    if(config.headers['Content-Type'] === 'application/json') {
      config['body'] = JSON.stringify(parameters);
    } else {
      config['body'] = parameters;
    }
  }

  if(config.headers['Content-Type'] === '') {
    delete config.headers['Content-Type'];
  }

  const result = await fetch(
    `${process.env.REACT_APP_API_URL}/api${endpoint}${params.toString() ? '?'+params.toString() : ''}`,
    config
  );

  if (result.headers.has('content-type')) {
    if(result.headers.get('content-type').match(/^application\/json/i)) {
      result.data = await result.json();
    } else if(result.headers.get('content-type').match(/^application\/pdf/i)) {
      result.data = await result.blob();
    } else if(result.headers.get('content-type').match(/^video/i)) {
      const blob = await result.blob();
      const name = encodeURIComponent(response.name.replace(/\s/g, '.'));
      download(blob, name, result.headers.get('content-type'));

    } else {
      result.data = await result.text();
    }
  } else {
    result.data = await result.text();
  }

  if (result.status.toString().substr(0,1) !== '2') {
    throw result;
  }

  return result;
};
