// @ts-nocheck

/**

 * Manejador centralizado de errores

 */


export class AppError extends Error {

  constructor(message, code = 'UNKNOWN_ERROR', details = null) {

    super(message);

    this.code = code;

    this.details = details;

    this.timestamp = new Date().toISOString();

  }

}


/**

 * Mapea errores HTTP a mensajes amigables

 */

export const getErrorMessage = (error) => {

  if (!error) return 'Ocurrió un error desconocido';


  // Si es un AppError personalizado

  if (error instanceof AppError) {

    return error.message;

  }


  // Si es un error de red

  if (error.message === 'Network request failed' || error.message === 'Failed to fetch') {

    return 'Error de conexión. Verifica tu internet.';

  }


  // Si es un error HTTP

  if (error.status) {

    switch (error.status) {

      case 400:

        return 'Datos inválidos. Por favor, revisa tus datos.';

      case 401:

        return 'No autorizado. Por favor, inicia sesión de nuevo.';

      case 403:

        return 'No tienes permiso para realizar esta acción.';

      case 404:

        return 'Recurso no encontrado.';

      case 429:

        return 'Demasiadas peticiones. Intenta más tarde.';

      case 500:

        return 'Error del servidor. Intenta más tarde.';

      case 503:

        return 'Servicio no disponible. Intenta más tarde.';

      default:

        return `Error ${error.status}: ${error.message}`;

    }

  }


  // Mensaje por defecto

  return error.message || 'Ocurrió un error desconocido';

};


/**

 * Registra un error en la consola (en desarrollo)

 */

export const logError = (error, context = '') => {

  if (__DEV__) {

    console.error(`[ERROR${context ? ` - ${context}` : ''}]`, error);

  }

};


/**

 * Crea un error de validación

 */

export const createValidationError = (field, message) => {

  return new AppError(`Validación fallida en ${field}: ${message}`, 'VALIDATION_ERROR', { field });

};


/**

 * Crea un error de autenticación

 */

export const createAuthError = (message = 'Autenticación fallida') => {

  return new AppError(message, 'AUTH_ERROR');

};


/**

 * Crea un error de límite de cuota

 */

export const createQuotaError = (message = 'Has alcanzado el límite de tu plan') => {

  return new AppError(message, 'QUOTA_EXCEEDED');

};
