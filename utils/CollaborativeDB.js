// @ts-nocheck

import HttpClient from './HttpClient';

/**

 * Servicio para la base de datos colaborativa (plan COLAB)

 */


/**

 * Contribuye una nueva tarea a la base de datos

 */

export const contributeTask = async (taskData) => {

  try {

    const response = await HttpClient.post('/api/collaborative/tasks/contribute', {

      ...taskData,

      contributedAt: new Date().toISOString(),

    });


    if (!response.success) {

      throw new Error(response.error || 'Error al contribuir tarea');

    }


    return {

      success: true,

      taskId: response.data.id,

      message: 'Tarea contribuida exitosamente',

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

    };

  }

};


/**

 * Edita una tarea existente en la base de datos

 */

export const editContributedTask = async (taskId, updates) => {

  try {

    const response = await HttpClient.put(`/api/collaborative/tasks/${taskId}`, {

      ...updates,

      editedAt: new Date().toISOString(),

    });


    if (!response.success) {

      throw new Error(response.error || 'Error al editar tarea');

    }


    return {

      success: true,

      message: 'Tarea actualizada exitosamente',

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

    };

  }

};


/**

 * Obtiene el historial de contribuciones de un usuario

 */

export const getMyContributions = async (page = 1, limit = 10) => {

  try {

    const response = await HttpClient.get(`/api/collaborative/my-contributions?page=${page}&limit=${limit}`);


    if (!response.success) {

      throw new Error(response.error || 'Error al obtener contribuciones');

    }


    return {

      success: true,

      contributions: response.data.contributions || [],

      total: response.data.total || 0,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

      contributions: [],

    };

  }

};


/**

 * Vota por una tarea (útil/no útil)

 */

export const voteTask = async (taskId, vote = 'helpful') => {

  try {

    const response = await HttpClient.post(`/api/collaborative/tasks/${taskId}/vote`, {

      vote,

      votedAt: new Date().toISOString(),

    });


    if (!response.success) {

      throw new Error(response.error || 'Error al votar');

    }


    return {

      success: true,

      message: 'Voto registrado',

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

    };

  }

};


/**

 * Comenta en una tarea

 */

export const commentTask = async (taskId, comment) => {

  try {

    const response = await HttpClient.post(`/api/collaborative/tasks/${taskId}/comments`, {

      text: comment,

      commentedAt: new Date().toISOString(),

    });


    if (!response.success) {

      throw new Error(response.error || 'Error al comentar');

    }


    return {

      success: true,

      commentId: response.data.id,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

    };

  }

};


/**

 * Obtiene estadísticas de contribuciones

 */

export const getContributionStats = async () => {

  try {

    const response = await HttpClient.get('/api/collaborative/stats');


    if (!response.success) {

      throw new Error(response.error || 'Error al obtener estadísticas');

    }


    return {

      success: true,

      stats: response.data,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

    };

  }

};


/**

 * Obtiene el ranking de contribuidores

 */

export const getContributorRanking = async (limit = 10) => {

  try {

    const response = await HttpClient.get(`/api/collaborative/ranking?limit=${limit}`);


    if (!response.success) {

      throw new Error(response.error || 'Error al obtener ranking');

    }


    return {

      success: true,

      ranking: response.data,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

      ranking: [],

    };

  }

};
