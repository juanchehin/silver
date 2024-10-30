import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor() { }

  
// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {

  // tslint:disable-next-line: one-variable-per-declaration
  let d = new Date(date),month = '' + (d.getMonth() + 1),day = '' + (d.getDate() + 1),
  // tslint:disable-next-line: prefer-const
  year = d.getFullYear();

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }

  return [year, month, day].join('-');
}
// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDateNow(date: any) {
    // tslint:disable-next-line: one-variable-per-declaration
    let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + (d.getDate()),
    // tslint:disable-next-line: prefer-const
    year = d.getFullYear();
  
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
  
    return [year, month, day].join('-');
  }

  formatDate2(dateString: any) {
    // Crear un objeto Date a partir de la cadena
    const date = new Date(dateString);
  
    // Extraer el año, mes y día
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const day = String(date.getDate()).padStart(2, '0');
  
    // Devolver la fecha en formato yyyy-mm-dd
    return `${year}-${month}-${day}`;
  }

  
 formatNumber(value: any): string {
  // Verifica si el valor es un número
  const numberValue = Number(value); // Convierte el valor a número

  // Si el valor no es un número o es NaN, retorna '0.00'
  if (isNaN(numberValue)) return '0.00';

  // Convertir a un número con dos decimales
  const formattedValue = numberValue.toFixed(2);

  // Separar los enteros de los decimales
  const [integerPart, decimalPart] = formattedValue.split('.');

  // Formatear la parte entera con puntos como separadores de miles
  const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Retornar el valor formateado
  return `${integerFormatted},${decimalPart}`;
}


}
