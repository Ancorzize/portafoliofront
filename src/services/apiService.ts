// src/services/apiService.ts
const BASE_URL = import.meta.env.VITE_API_URL;

import type { Foto } from '../types/Portfolio';

export const fetchData = async <T>(endpoint: string): Promise<T[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error en ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFotos = async (): Promise<Foto[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Fotos`);
    if (!response.ok) throw new Error('Error al obtener fotos');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const downloadCV = async (): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/HojaVida/pdf`, {
      method: 'GET',
    });

    if (!response.ok) throw new Error('No se pudo generar el PDF');

    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    link.setAttribute('download', 'HojaVida_Luis_Cordoba.pdf'); 
    
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar el CV:', error);
    alert('Hubo un error al generar el PDF. Por favor, intenta más tarde.');
  }
};