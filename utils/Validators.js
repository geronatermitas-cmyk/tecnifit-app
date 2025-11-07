// @ts-nocheck

/**

 * Utilidades de validación para formularios y datos

 */


/**

 * Valida un email

 */

export const validateEmail = (email) => {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);

};


/**

 * Valida una contraseña (mínimo 6 caracteres)

 */

export const validatePassword = (password) => {

  return password && password.length >= 6;

};


/**

 * Valida un nombre (no vacío, sin números)

 */

export const validateName = (name) => {

  return name && name.trim().length >= 2 && !/\d/.test(name);

};


/**

 * Valida que un campo no esté vacío

 */

export const validateRequired = (value) => {

  return value && String(value).trim().length > 0;

};


/**

 * Valida una URL

 */

export const validateUrl = (url) => {

  try {

    new URL(url);

    return true;

  } catch {

    return false;

  }

};


/**

 * Valida un teléfono (formato básico)

 */

export const validatePhone = (phone) => {

  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

  return regex.test(phone);

};


/**

 * Valida que el email y contraseña sean válidos

 */

export const validateLoginForm = (email, password) => {

  const errors = {};

  if (!validateEmail(email)) errors.email = 'Email inválido';

  if (!validatePassword(password)) errors.password = 'Contraseña debe tener al menos 6 caracteres';

  return { valid: Object.keys(errors).length === 0, errors };

};


/**

 * Valida que los datos de registro sean válidos

 */

export const validateSignupForm = (name, email, password) => {

  const errors = {};

  if (!validateName(name)) errors.name = 'Nombre inválido';

  if (!validateEmail(email)) errors.email = 'Email inválido';

  if (!validatePassword(password)) errors.password = 'Contraseña debe tener al menos 6 caracteres';

  return { valid: Object.keys(errors).length === 0, errors };

};


/**

 * Valida una descripción de tarea

 */

export const validateTaskDescription = (description) => {

  return description && description.trim().length >= 5;

};
