// @ts-nocheck

import { API_BASE_URL } from './Constants';

/**

 * Cliente HTTP centralizado para todas las peticiones al backend

 * Maneja autenticación, errores y reintentos

 */

class HttpClient {

  constructor(baseURL = API_BASE_URL) {

    this.baseURL = baseURL;

    this.token = null;

    this.timeout = 30000; // 30 segundos

  }


  /**

   * Establece el token de autenticación

   */

  setToken(token) {

    this.token = token;

  }


  /**

   * Realiza una petición GET

   */

  async get(endpoint, options = {}) {

    return this.request(endpoint, { ...options, method: 'GET' });

  }


  /**

   * Realiza una petición POST

   */

  async post(endpoint, data, options = {}) {

    return this.request(endpoint, {

      ...options,

      method: 'POST',

      body: JSON.stringify(data),

    });

  }


  /**

   * Realiza una petición PUT

   */

  async put(endpoint, data, options = {}) {

    return this.request(endpoint, {

      ...options,

      method: 'PUT',

      body: JSON.stringify(data),

    });

  }


  /**

   * Realiza una petición DELETE

   */

  async delete(endpoint, options = {}) {

    return this.request(endpoint, { ...options, method: 'DELETE' });

  }


  /**

   * Método central para realizar peticiones

   */

  async request(endpoint, options = {}) {

    const url = `${this.baseURL}${endpoint}`;

    const headers = {

      'Content-Type': 'application/json',

      ...options.headers,

    };


    // Añadir token si está disponible

    if (this.token) {

      headers['Authorization'] = `Bearer ${this.token}`;

    }


    try {

      const controller = new AbortController();

      const timeoutId = setTimeout(() => controller.abort(), this.timeout);


      const response = await fetch(url, {

        ...options,

        headers,

        signal: controller.signal,

      });


      clearTimeout(timeoutId);


      // Parsear respuesta

      let data;

      try {

        data = await response.json();

      } catch {

        data = null;

      }


      // Manejar errores HTTP

      if (!response.ok) {

        const error = new Error(data?.message || `HTTP ${response.status}`);

        error.status = response.status;

        error.data = data;

        throw error;

      }


      return { success: true, data, status: response.status };

    } catch (error) {

      return {

        success: false,

        error: error.message || 'Error de conexión',

        status: error.status || 0,

      };

    }

  }

}


export default new HttpClient();
