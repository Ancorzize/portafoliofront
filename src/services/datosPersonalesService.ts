import type { DatosPersonales } from '../types/DatosPersonales';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getDatosPersonales = async (): Promise<DatosPersonales[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/DatosPersonales`);
    if (!response.ok) throw new Error('Error al obtener los datos');
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const getDatosPersonalesById = async (id: number): Promise<DatosPersonales | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/DatosPersonales/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};