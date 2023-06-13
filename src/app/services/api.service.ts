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
    console.log(data);
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

    // Essa consulta ficou ineficiente, pois estou tratando os dados de forma local, imagino que com uma 
    // grande quantidade de dados essa busca fique completaente obsoleta, só fiz dessa forma para que seja possível através do
    // mesmo input fazer consulta em colunas diferentes, pois o in-memory-web-api não tem suporte para consultas combinadas.

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
}
