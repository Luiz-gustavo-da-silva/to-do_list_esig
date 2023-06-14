import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTask() {
    return this.http.get<any>('api/Tasks?situation=true');
  }

  postTask(data: any) {
    return this.http.post<any>('api/Tasks', data);
  }

  deleteTask(id: number) {
    return this.http.delete<any>(`api/Tasks/${id}`);
  }

  putTask(data: any, id: number) {
    return this.http.put<any>(`api/Tasks/${id}`, data);
  }

  concludeTask(data: any, id: number) {
    data.situation = false;
    return this.http.put<any>(`api/Tasks/${id}`, data);
  }

  //Essa consulta está ineficiente, pois estou tratando os dados localmente. 
  //Imagino que com uma grande quantidade de dados, essa abordagem se torne 
  //completamente obsoleta. No entanto, optei por fazê-la dessa forma para 
  //permitir consultas em colunas diferentes usando o in-memory-web-api, que
  //não suporta consultas combinadas.

  filterTask(data: any) {
    const { number, situation, titleOrDescription, responsible } = data;
    let queryString = `api/Tasks?`;

    if (number) {
      queryString += `id=${number}&`;
    }

    if (situation) {
      queryString += `situation=${situation}&`;
    }

    if (responsible) {
      queryString += `responsible=${responsible}&`;
    }

    if (titleOrDescription) {
      const tituloRequest = this.http.get<any>(`${queryString}title=${titleOrDescription}`);
      const descricaoRequest = this.http.get<any>(`${queryString}description=${titleOrDescription}`);
  
      return forkJoin([tituloRequest, descricaoRequest]).pipe(
        map(results => {
          const [tituloResponse, descricaoResponse] = results;
          return [...tituloResponse, ...descricaoResponse];
        })
      );
    }

    queryString = queryString.slice(0, -1);

    return this.http.get<any>(queryString);
  }

  loginUser(data:any){
    const {login, senha} = data;
    return this.http.get<any>(`api/Users?login=${login}&senha=${senha}`);
  }
}
