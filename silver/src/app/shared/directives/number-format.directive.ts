import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberFormat]'
})
export class NumberFormatDirective {

  private previousValue: string = ''; // Guardamos el valor anterior para evitar conflictos

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    // Guardar el cursor actual para restaurarlo después del formateo
    const inputElement = this.el.nativeElement;
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    // Obtener el valor del input sin puntos ni comas y convertir a float
    let value = inputElement.value.replace(/\./g, '').replace(/,/g, '.');
    
    if (value && !isNaN(value)) {
      // Almacenar el valor anterior para prevenir loops de formato
      this.previousValue = value;

      const formattedValue = new Intl.NumberFormat('de-DE', 
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      ).format(value);
      
      // Asignar el valor formateado al input
      inputElement.value = formattedValue;

      // Restaurar el cursor después de actualizar el valor
      inputElement.setSelectionRange(start, end);
    } else {
      // Restaurar el valor anterior si el nuevo es inválido
      inputElement.value = this.previousValue;
    }
  }

}
