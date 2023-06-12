import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTask() {
    return this.http.get<any>("api/Tasks");
  }

  postTask(data: any) {
    return this.http.post<any>("api/Tasks", data);
  }

  deleteTask(id: number) {
    return this.http.delete<any>(`api/Tasks/${id}`);
  }

  putTask(data: any, id: number) {
    return this.http.put<any>(`api/Tasks/${id}`, data);
  }

}
