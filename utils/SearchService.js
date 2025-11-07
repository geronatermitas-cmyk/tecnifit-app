// @ts-nocheck

import HttpClient from './HttpClient';

/**

 * Servicio de búsqueda de tareas

 */


/**

 * Busca tareas por palabras clave

 */

export const searchTasks = async (query, filters = {}) => {

  try {

    const params = new URLSearchParams({

      q: query,

      ...filters,

    });


    const response = await HttpClient.get(`/api/tasks/search?${params.toString()}`);


    if (!response.success) {

      throw new Error(response.error || 'Error en la búsqueda');

    }


    return {

      success: true,

      tasks: response.data.tasks || [],

      total: response.data.total || 0,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

      tasks: [],

    };

  }

};


/**

 * Obtiene todas las tareas (con paginación)

 */

export const getAllTasks = async (page = 1, limit = 10) => {

  try {

    const response = await HttpClient.get(`/api/tasks?page=${page}&limit=${limit}`);


    if (!response.success) {

      throw new Error(response.error || 'Error al obtener tareas');

    }


    return {

      success: true,

      tasks: response.data.tasks || [],

      page: response.data.page,

      total: response.data.total,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

      tasks: [],

    };

  }

};


/**

 * Obtiene una tarea específica por ID

 */

export const getTaskById = async (taskId) => {

  try {

    const response = await HttpClient.get(`/api/tasks/${taskId}`);


    if (!response.success) {

      throw new Error(response.error || 'Error al obtener tarea');

    }


    return {

      success: true,

      task: response.data,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

    };

  }

};


/**

 * Obtiene tareas recomendadas para un usuario

 */

export const getRecommendedTasks = async (userPlan = 'free') => {

  try {

    const response = await HttpClient.get(`/api/tasks/recommended?plan=${userPlan}`);


    if (!response.success) {

      throw new Error(response.error || 'Error al obtener recomendaciones');

    }


    return {

      success: true,

      tasks: response.data.tasks || [],

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

      tasks: [],

    };

  }

};


/**

 * Obtiene tareas por categoría

 */

export const getTasksByCategory = async (category, page = 1, limit = 10) => {

  try {

    const response = await HttpClient.get(`/api/tasks/category/${category}?page=${page}&limit=${limit}`);


    if (!response.success) {

      throw new Error(response.error || 'Error al obtener tareas');

    }


    return {

      success: true,

      tasks: response.data.tasks || [],

      page: response.data.page,

      total: response.data.total,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

      tasks: [],

    };

  }

};
