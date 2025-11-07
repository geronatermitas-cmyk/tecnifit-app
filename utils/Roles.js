// @ts-nocheck


// Orden base de roles

export const ROLES = ['guest', 'free', 'pro', 'admin'];


// Límites por rol (ajustables más adelante)

export const ROLE_LIMITS = {

  guest: { dailyTasks: 0 }, // sin guardar, solo ver BD limitada

  free: { dailyTasks: 3 }, // 3 confirmaciones/día

  pro: { dailyTasks: Infinity }, // sin límite

  admin: { dailyTasks: Infinity },

};
