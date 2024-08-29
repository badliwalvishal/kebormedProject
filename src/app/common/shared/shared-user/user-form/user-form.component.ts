import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserCreate } from '../../../interface/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  public userForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserCreate, private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      country: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    } else {
      this.snackBar.open('Form is invalid', 'Close', {
        duration: 3000,
      });    
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get control() {
    return this.userForm.controls;
  }

  getErrorMessage(controlName: string): string {
    const control = this.control[controlName];
    if (control.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control.hasError('email')) {
      return 'Invalid email format';
    }
    if (control.hasError('pattern')) {
      if (controlName === 'mobile') {
        return 'Mobile must be 10 digits';
      }
      if (controlName === 'age') {
        return 'Age must be a number';
      }
    }
    return '';
  }

}

