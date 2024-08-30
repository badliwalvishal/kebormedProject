import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserStore } from '../store/user.store';
import { User, UserCreate } from '../../common/interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://66c78e57732bf1b79fa6e658.mockapi.io/users/users';

  constructor(private http: HttpClient, private userStore: UserStore) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => this.userStore.setUsers(users)), 
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.userStore.deleteUser(id)),
      catchError(this.handleError)
    );
  }

  createUser(user: UserCreate): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(newUser => this.userStore.addUser(newUser)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
