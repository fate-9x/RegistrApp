import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../classes/course';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  public db: SQLiteObject;
  tblCourses:string = "CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY autoincrement, name TEXT, assists INTEGER, section TEXT)";
  tblAuth: string = "CREATE TABLE IF NOT EXISTS auth (username TEXT PRIMARY KEY, name TEXT)";
  addCourses:string = "INSERT INTO courses (name, assists, section) VALUES (?, ?, ?)";
  addUser:string = "INSERT INTO auth (username, name) VALUES (?, ?)";

  listCourses = new BehaviorSubject([]);
  listUser = new BehaviorSubject([]);
  private isDbReady:
  BehaviorSubject<boolean> = new BehaviorSubject(false);

  

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {

    this.createBD();
    
  }

  createBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.db = db;
        this.createTable();
      }).catch(e => {
        this.presentToast(e);
      });
    });
  }

  async createTable() {
    try {
      await this.db.executeSql(this.tblCourses, []);
      
      await this.db.executeSql(this.tblAuth, []);
      
      this.loadCourses();
      this.loadUser();
      this.isDbReady.next(true); 
    } catch (error) {
      console.log(error);
    }
  }
  loadCourses() {
    return this.db.executeSql('SELECT * FROM courses', []).then(data => {
      let courses: Course[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          courses.push({id:data.rows.item(i).id, name: data.rows.item(i).name, section: data.rows.item(i).section, assists: data.rows.item(i).assists });
        }
      }
      this.listCourses.next(courses);
    });
  }

  loadUser(){
    return this.db.executeSql('SELECT * FROM auth', []).then(data => {
      let user: User[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          user.push({username:data.rows.item(i).username, name: data.rows.item(i).name});
        }
      }
      this.listUser.next(user);
    });
  }

  async addCourse(name,assists,section){
    let data=[name,assists,section];
    await this.db.executeSql(this.addCourses, data);
    this.loadCourses();
    this.presentToast("Curso Agregado");
  }
  updateCourse(id, name, assists, section){
    let data=[name, assists, section , id];
    return this.db.executeSql('UPDATE courses SET name = ?, assists = ?, section = ? WHERE id = ?',data)
    .then(()=>{
      this.loadCourses();
      this.presentToast("Curso Actualizado");
    });
    
  }
  deleteCourse(id){
    return this.db.executeSql('DELETE FROM courses WHERE id=?',[id])
    .then(()=>{
      this.loadCourses();
    });
  }
  dbState(){
    return this.isDbReady.asObservable();
  }

  fetchCourses(): Observable<Course[]> {
    return this.listCourses.asObservable();
  }

  addUsers(username, name){
    let data=[username, name];
    this.db.executeSql(this.addUser, data);
    this.loadUser();
  }

  fetchUser(): Observable<User[]> {
    return this.listUser.asObservable();
  }

  deleteUser(username){
    return this.db.executeSql('DELETE FROM auth WHERE username = ?',[username])
    .then(()=>{
      this.loadUser();
    });
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
