// @ts-nocheck

import { ROLE_LIMITS } from './Roles';

/**

 * Gestor de cuotas y límites por plan

 */


/**

 * Obtiene los límites para un plan específico

 */

export const getPlanLimits = (plan = 'free') => {

  const planLower = String(plan).toLowerCase();

  return ROLE_LIMITS[planLower] || ROLE_LIMITS.free;

};


/**

 * Verifica si un usuario puede generar una tarea

 */

export const canGenerateTask = (plan = 'free', usedToday = 0) => {

  const limits = getPlanLimits(plan);

  const dailyLimit = limits.dailyTasks;


  // Si es infinito, siempre puede

  if (dailyLimit === Infinity) {

    return { allowed: true, remaining: Infinity };

  }


  // Si es 0, nunca puede (guest)

  if (dailyLimit === 0) {

    return { allowed: false, remaining: 0, message: 'Tu plan no permite generar tareas' };

  }


  // Si ya alcanzó el límite

  if (usedToday >= dailyLimit) {

    return {

      allowed: false,

      remaining: 0,

      message: `Has alcanzado el límite diario de ${dailyLimit} tareas`,

    };

  }


  // Si puede generar

  return {

    allowed: true,

    remaining: dailyLimit - usedToday,

  };

};


/**

 * Verifica si un usuario puede usar una característica

 */

export const canUseFeature = (feature, plan = 'free') => {

  const features = {

    guest: ['view_tasks', 'search'],

    free: ['view_tasks', 'search', 'generate_tasks', 'tutorials', 'internet_search'],

    pro: ['view_tasks', 'search', 'generate_tasks', 'tutorials', 'internet_search', 'unlimited_ai'],

    admin: ['*'], // acceso a todo

  };


  const planFeatures = features[String(plan).toLowerCase()] || features.free;


  // Si tiene acceso a todo

  if (planFeatures.includes('*')) {

    return true;

  }


  return planFeatures.includes(feature);

};


/**

 * Obtiene un resumen de cuota para un usuario

 */

export const getQuotaSummary = (plan = 'free', usedToday = 0) => {

  const limits = getPlanLimits(plan);

  const dailyLimit = limits.dailyTasks;


  return {

    plan,

    dailyLimit,

    usedToday,

    remaining: dailyLimit === Infinity ? Infinity : Math.max(0, dailyLimit - usedToday),

    percentageUsed: dailyLimit === Infinity ? 0 : (usedToday / dailyLimit) * 100,

    isUnlimited: dailyLimit === Infinity,

  };

};


/**

 * Calcula el precio estimado para un upgrade

 */

export const getUpgradePrice = (fromPlan = 'free', toPlan = 'pro') => {

  const prices = {

    free: 0,

    pro: 9.99,

    colab: 19.99,

  };


  const fromPrice = prices[String(fromPlan).toLowerCase()] || 0;

  const toPrice = prices[String(toPlan).toLowerCase()] || 0;


  return {

    fromPrice,

    toPrice,

    difference: Math.max(0, toPrice - fromPrice),

  };

};
