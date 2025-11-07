// @ts-nocheck

import HttpClient from './HttpClient';

/**

 * Servicio de IA para generar tareas

 */


/**

 * Genera una tarea a partir de una descripción de texto

 */

export const generateTaskFromDescription = async (description, userPlan = 'free') => {

  try {

    const response = await HttpClient.post('/api/ai/generate-task', {

      description,

      plan: userPlan,

      type: 'text',

    });


    if (!response.success) {

      throw new Error(response.error || 'Error al generar tarea');

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

 * Genera una tarea a partir de una imagen

 */

export const generateTaskFromImage = async (imageBase64, userPlan = 'free') => {

  try {

    const response = await HttpClient.post('/api/ai/generate-task-from-image', {

      image: imageBase64,

      plan: userPlan,

      type: 'image',

    });


    if (!response.success) {

      throw new Error(response.error || 'Error al procesar imagen');

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

 * Genera una tarea a partir de un código de barras/QR

 */

export const generateTaskFromBarcode = async (barcodeData, userPlan = 'free') => {

  try {

    const response = await HttpClient.post('/api/ai/generate-task-from-barcode', {

      code: barcodeData,

      plan: userPlan,

      type: 'barcode',

    });


    if (!response.success) {

      throw new Error(response.error || 'Error al procesar código');

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

 * Obtiene tutoriales relacionados con una tarea

 */

export const getTutorials = async (taskId, userPlan = 'free') => {

  try {

    const response = await HttpClient.get(`/api/tutorials?taskId=${taskId}&plan=${userPlan}`);


    if (!response.success) {

      throw new Error(response.error || 'Error al obtener tutoriales');

    }


    return {

      success: true,

      tutorials: response.data,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

    };

  }

};


/**

 * Busca información de internet sobre un tema

 */

export const searchInternet = async (query, userPlan = 'free') => {

  try {

    const response = await HttpClient.get(`/api/search?q=${encodeURIComponent(query)}&plan=${userPlan}`);


    if (!response.success) {

      throw new Error(response.error || 'Error en la búsqueda');

    }


    return {

      success: true,

      results: response.data,

    };

  } catch (error) {

    return {

      success: false,

      error: error.message,

    };

  }

};
