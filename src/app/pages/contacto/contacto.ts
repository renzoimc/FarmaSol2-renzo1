import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Asegura que ReactiveForms funcione
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class Contacto {
  contactoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required], 
      celular: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],  // 9 dígitos y empieza en 9
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      console.log('Datos del formulario:', this.contactoForm.value);
      alert('Formulario enviado con éxito');
      // Aquí puedes agregar un POST al backend más adelante
    } else {
      alert('Por favor, completa correctamente el formulario.');
      this.contactoForm.markAllAsTouched();
    }

    console.log('Datos del formulario:', {
    ...this.contactoForm.value,
    celular: '+51' + this.contactoForm.value.celular
  });
  }

  esInvalido(campo: string): boolean {
    const control = this.contactoForm.get(campo);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}
