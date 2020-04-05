import {getLanguage} from './locale';
import download from 'downloadjs';

/**
 * @param url
 * @returns {Promise<{audios: (Array|null|*), videos: *[]}>}
 */
export const stream = async(url) => {
  const token = localStorage.getItem('token');
  const response = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Language': getLanguage(),
      }
    }
  );

  let data=null;
  if (response.headers.has('content-type')) {
    if(response.headers.get('content-type').match(/^application\/json/i)) {
      data = await response.json();
    }
  }

  if (response.status.toString().substr(0,1) !== '2') {
    throw data || response;
  }

  if(!data) {
    throw new Error('No data provided');
  }

  if(!data.video) {
    throw new Error('No video track');
  }

  if(!data.video.src) {
    throw new Error('Stream malformed (video)')
  }

  if(!data.audios || data.audios.length === 0) {
    throw new Error('No audio tracks');
  }

  if(data.audios.filter((a) => !a.src || a.default === null).length > 0) {
    throw new Error('Stream malformed (audio)');
  }

  if(data.audios.filter((a) => a.default).length === 0) {
    data.audios = data.audios.map((a, key) => {
      return {
        ...a,
        default: key === 0,
      }
    });
  }


  const dataReturn = {
    videos: [data.video],
    audios: data.audios,
    subtitles: [],
  };

  if(data.subtitles && data.subtitles.length > 0) {
    dataReturn.subtitles = data.subtitles.map((s) => {
      return {
        lang: s.lang,
        name: s.name,
        label: s.name,
        index: parseInt(s.index),
        src: s.src,
        default: !!s.default,
        active: s.default ? 1 : 0
      }
    })
  }

  return dataReturn;
};

/**
 * @param method
 * @param endpoint
 * @param parameters
 * @param headers
 * @param response
 * @returns {Promise<Response>}
 */
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
