// @ts-nocheck

import * as FileSystem from 'expo-file-system';

/**

 * Procesa imágenes para enviar al backend

 */


/**

 * Convierte una imagen a base64

 */

export const imageToBase64 = async (imageUri) => {

  try {

    const base64 = await FileSystem.readAsStringAsync(imageUri, {

      encoding: FileSystem.EncodingType.Base64,

    });

    return base64;

  } catch (error) {

    throw new Error(`Error al procesar imagen: ${error.message}`);

  }

};


/**

 * Obtiene información de una imagen

 */

export const getImageInfo = async (imageUri) => {

  try {

    const info = await FileSystem.getInfoAsync(imageUri);

    return {

      uri: imageUri,

      size: info.size,

      exists: info.exists,

      isDirectory: info.isDirectory,

    };

  } catch (error) {

    throw new Error(`Error al obtener info de imagen: ${error.message}`);

  }

};


/**

 * Comprime una imagen (simulado para web)

 */

export const compressImage = async (imageUri, quality = 0.8) => {

  // En web/Expo, la compresión se maneja en el cliente

  // Para aplicaciones nativas, usarías librerías como react-native-image-resizer

  return imageUri;

};


/**

 * Procesa un código QR/barras

 * En la práctica, esto vendría del escáner

 */

export const processBarcode = (barcodeData) => {

  return {

    code: barcodeData,

    type: 'barcode',

    timestamp: new Date().toISOString(),

  };

};


/**

 * Extrae texto de una imagen usando OCR (simulado)

 * En la práctica, usarías una API como Google Vision o Tesseract

 */

export const extractTextFromImage = async (imageUri) => {

  // Simulación: en producción, llamarías a una API de OCR

  return {

    text: 'Texto extraído de la imagen',

    confidence: 0.95,

    timestamp: new Date().toISOString(),

  };

};
