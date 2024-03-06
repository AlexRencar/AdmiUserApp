import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import * as Toastify from 'toastify-js';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId?: number;

  ngOnInit(): void {
    this.loadDataIntoForm();
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      numero_celular: new FormControl('', [Validators.pattern(/^\d{10}$/)]),
      cedula: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      fecha_nacimiento: new FormControl('', [Validators.required, this.validateAge]),
      codigo_ciudad: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', Validators.required),
    });
  }

  saveUser(): void {
    const userValues = this.userForm.value;
  
    if (this.userId) {
      // Actualización de usuario existente
      this.userService.updateUser(this.userId, userValues).subscribe(
        (user) => {
          const successMessage = 'Usuario actualizado con éxito';
          this.showSuccessToast(successMessage);
          this.router.navigateByUrl('/users');
        },
        (error) => {
          // Manejar errores, si es necesario
          console.error(error);
        }
      );
    } else {
      // Creación de nuevo usuario
      this.userService.createUser(userValues).subscribe(
        (user) => {
          const successMessage = 'Usuario agregado con éxito';
          this.showSuccessToast(successMessage);
          this.router.navigateByUrl('/users');
        },
        (error) => {
          // Manejar errores, si es necesario
          console.error(error);
        }
      );
    }
  }
  
  
  hasError(field: string): boolean {
    const errorsObject = this.userForm.get(field)?.errors || {};
    const errors = Object.keys(errorsObject);
  
    return !!errors.length && !!(this.userForm.get(field)?.touched || this.userForm.get(field)?.dirty);
  }

  getCurrentError(field: string): string {
    const errorsObject = this.userForm.get(field)?.errors || {};
    const errors = Object.keys(errorsObject);

    if (!errors || errors.length === 0) {
      return '';
    }

    return errors[0];
  }

  getFormTitle(): string {
    return this.userId ? 'Editar usuario' : 'Nuevo usuario';
  }

  private loadDataIntoForm(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(user => this.userForm.patchValue(user));
    }
  }

  private showSuccessToast(message: string): void {
    Toastify({
      text: message,
      close: true,
      gravity: 'bottom',
      position: 'center',
      stopOnFocus: true,
      style: {
        background: '#189586',
      }
    }).showToast();
  }

  private validateAge(control: FormControl): { [key: string]: boolean } | null {
    const birthdate = new Date(control.value);
    const age = new Date().getFullYear() - birthdate.getFullYear();

    return age < 18 ? { 'invalidAge': true } : null;
  }
}
