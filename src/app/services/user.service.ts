import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students, Users } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  alumnos:Users[]=[];

  constructor(private http:HttpClient) { 
  }

  loadUsers(){
    this.http.get<Students>(`https://nancyb3a.github.io/Test/usuarios_PGY4121_03.json`).subscribe(resp=>
    {
      this.alumnos.push(...resp.alumnos);
    });
  }

  validateUser(userName:string, password:string){
    this.loadUsers();

    for(let user of this.alumnos){
      if(user.username == userName && user.password == password){
        return true;
      }
    }
    return false;
  }
  getUsers(username:string){
    this.loadUsers();

    for(let user of this.alumnos){
      if(user.username == username){
        return user;
      }
    }
    return null;
  }
}
