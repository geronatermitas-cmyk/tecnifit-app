// Datos de resultados de búsqueda para la Landing Page
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

// Función de simulación de IA para TaskBuilderScreen
export const generateTaskMock = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Simulación de un resultado de IA basado en palabras clave
  let title = `Guía de Reparación IA: ${query}`;
  let steps = [
    "Paso 1: Preparación y Seguridad. Asegura el vehículo y reúne las herramientas necesarias.",
    "Paso 2: Diagnóstico. Localiza la pieza o el área descrita en la consulta.",
    "Paso 3: Desmontaje. Retira los componentes necesarios para acceder a la pieza principal.",
    "Paso 4: Reemplazo. Instala la nueva pieza o realiza la reparación específica.",
    "Paso 5: Montaje y Prueba. Vuelve a montar los componentes y verifica el funcionamiento."
  ];
  let estimatedTime = "45 min";
  let difficulty = "Medio";

  if (lowerQuery.includes('filtro') || lowerQuery.includes('aceite')) {
    title = `Guía IA: Cambio de Filtro y Aceite para ${query.split(' ').pop()}`;
    steps = [
      "Paso 1: Drenar el aceite viejo. Coloca la bandeja y quita el tapón del cárter.",
      "Paso 2: Reemplazar el filtro. Quita el filtro viejo y coloca el nuevo, lubricando la junta.",
      "Paso 3: Rellenar con aceite nuevo. Vierte la cantidad correcta de aceite.",
      "Paso 4: Comprobar niveles. Enciende el motor brevemente y revisa el nivel."
    ];
    estimatedTime = "30 min";
    difficulty = "Fácil";
  } else if (lowerQuery.includes('freno') || lowerQuery.includes('pastillas')) {
    title = `Guía IA: Sustitución de Pastillas de Freno para ${query.split(' ').pop()}`;
    steps = [
      "Paso 1: Levantar el vehículo y quitar la rueda.",
      "Paso 2: Retirar la pinza de freno y las pastillas viejas.",
      "Paso 3: Comprimir el pistón y colocar las pastillas nuevas.",
      "Paso 4: Volver a montar la pinza y la rueda. Bombea el pedal de freno."
    ];
    estimatedTime = "60 min";
    difficulty = "Difícil";
  }

  return {
    id: 'ia-task-' + Date.now(),
    title: title,
    description: `Guía generada por IA basada en la consulta: "${query}".`,
    category: 'IA Generada',
    time: estimatedTime,
    difficulty: difficulty,
    image: 'https://via.placeholder.com/150/000000/FFFFFF?text=IA+Task',
    steps: steps,
  };
};
