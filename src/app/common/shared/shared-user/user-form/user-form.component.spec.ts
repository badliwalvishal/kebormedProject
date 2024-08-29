import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserCreate } from '../../../interface/user.model';

const mockUser:UserCreate = {
  name: 'Kunal Mahajan',
  city: 'Lucknow',
  email: 'kunalmahajan@gmail.com',
  mobile: '9088999987',
  country: 'India',
  age: '28'
}

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let emailInput: DebugElement;
  let mobileInput: DebugElement;
  let ageInput: DebugElement;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<UserFormComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    mobileInput = fixture.debugElement.query(By.css('input[formControlName="mobile"]'));
    ageInput = fixture.debugElement.query(By.css('input[formControlName="age"]'));
  });

  it('should show an error message if the email format is invalid', () => {
    emailInput.nativeElement.value = 'invalid-email';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    emailInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement.nativeElement.textContent.trim()).toBe('Invalid email format');
  });

  it('should show an error message if the email is empty', () => {
    emailInput.nativeElement.value = '';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    emailInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement.nativeElement.textContent.trim()).toBe('Email is required');
  });

  it('should show an error message if the mobile number is invalid', () => {
    mobileInput.nativeElement.value = '12345';
    mobileInput.nativeElement.dispatchEvent(new Event('input'));
    mobileInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement.nativeElement.textContent.trim()).toBe('Mobile must be 10 digits');
  });

  it('should show an error message if the mobile number is empty', () => {
    mobileInput.nativeElement.value = '';
    mobileInput.nativeElement.dispatchEvent(new Event('input'));
    mobileInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement.nativeElement.textContent.trim()).toBe('Mobile is required');
  });

  it('should show an error message if the age is not a number', () => {
    ageInput.nativeElement.value = 'abc';
    ageInput.nativeElement.dispatchEvent(new Event('input'));
    ageInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement.nativeElement.textContent.trim()).toBe('Age must be a number');
  });

  it('should show an error message if the age is empty', () => {
    ageInput.nativeElement.value = '';
    ageInput.nativeElement.dispatchEvent(new Event('input'));
    ageInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement.nativeElement.textContent.trim()).toBe('Age is required');
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('should enable the submit button if the form is valid', () => {
    component.userForm.setValue(mockUser);
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should call MatDialogRef.close with form values on submit if form is valid', () => {
    component.userForm.setValue(mockUser);
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    expect(mockDialogRef.close).toHaveBeenCalledWith(mockUser);
  });

 });

