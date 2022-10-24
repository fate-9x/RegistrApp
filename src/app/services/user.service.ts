import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  getUsers():Observable<any>{
    return this.http.get(`https://nancyb3a.github.io/Test/usuarios_PGY4121_03.json`).pipe(
      retry(3)
    );
  }

}
