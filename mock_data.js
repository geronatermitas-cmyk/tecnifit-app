export const mockSearchResults = [
  {
    id: '1',
    title: 'Cambio de Filtro de Aceite para Motor Diesel',
    description: 'Guía paso a paso para el reemplazo del filtro de aceite en motores comunes.',
    category: 'Reparación',
    time: '30 min',
    difficulty: 'Fácil',
    image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Filtro+Aceite',
  },
  {
    id: '2',
    title: 'Montaje de Ruedas de Aleación',
    description: 'Tutorial completo para el montaje y equilibrado de ruedas de aleación.',
    category: 'Montaje',
    time: '60 min',
    difficulty: 'Medio',
    image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Ruedas+Aleacion',
  },
  {
    id: '3',
    title: 'Tutorial: Diagnóstico de Fallos en el Sistema Eléctrico',
    description: 'Pasos básicos para identificar problemas en el sistema de carga y batería.',
    category: 'Tutorial',
    time: '45 min',
    difficulty: 'Medio',
    image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Sistema+Electrico',
  },
  {
    id: '4',
    title: 'Sustitución de Pastillas de Freno',
    description: 'Guía detallada para el cambio de pastillas de freno delanteras.',
    category: 'Reparación',
    time: '90 min',
    difficulty: 'Difícil',
    image: 'https://via.placeholder.com/150/FFFF00/000000?text=Pastillas+Freno',
  },
];

export const searchMock = (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return mockSearchResults.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) || 
    item.description.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery)
  );
};
