import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Obtém as tarefas que possuem situação igual a true (Em andamento).
   * @returns Um Observable que emite uma resposta contendo as tarefas.
   */
  getTask() {
    return this.http.get<any>('api/Tasks?situation=true');
  }

  /**
   * Cria uma nova tarefa.
   * @param data Os dados da tarefa a ser criada.
   * @returns Um Observable que emite uma resposta contendo a tarefa criada.
   */
  postTask(data: any) {
    return this.http.post<any>('api/Tasks', data);
  }

  /**
   * Exclui uma tarefa pelo seu ID.
   * @param id O ID da tarefa a ser excluída.
   * @returns Um Observable que emite uma resposta vazia.
   */
  deleteTask(id: number) {
    return this.http.delete<any>(`api/Tasks/${id}`);
  }

  /**
   * Atualiza uma tarefa existente.
   * @param data Os novos dados da tarefa.
   * @param id O ID da tarefa a ser atualizada.
   * @returns Um Observable que emite uma resposta contendo a tarefa atualizada.
   */
  putTask(data: any, id: number) {
    return this.http.put<any>(`api/Tasks/${id}`, data);
  }

  /**
   * Conclui uma tarefa, definindo sua situação como false (concluído).
   * @param data Os dados da tarefa a ser concluída.
   * @param id O ID da tarefa a ser concluída.
   * @returns Um Observable que emite uma resposta contendo a tarefa concluída.
   */
  concludeTask(data: any, id: number) {
    data.situation = false;
    return this.http.put<any>(`api/Tasks/${id}`, data);
  }

  //Essa consulta está ineficiente, pois estou tratando os dados localmente. 
  //Imagino que com uma grande quantidade de dados, essa abordagem se torne 
  //completamente obsoleta. No entanto, optei por fazê-la dessa forma para 
  //permitir consultas em colunas diferentes usando o in-memory-web-api, que
  //não suporta consultas combinadas.
  /**
   * Filtra as tarefas com base nas informações fornecidas.
   * @param data Os critérios de filtro.
   * @returns Um Observable que emite uma resposta contendo as tarefas filtradas.
   */
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



  // Esse método foi crriado só parra simular uma login de um usuário 
  /**
   * Realiza o login do usuário.
   * @param data Os dados de login do usuário.
   * @returns Um Observable que emite uma resposta contendo os detalhes do usuário logado.
   */
  loginUser(data: any){
    const { login, senha } = data;
    return this.http.get<any>(`api/Users?login=${login}&senha=${senha}`);
  }
}
