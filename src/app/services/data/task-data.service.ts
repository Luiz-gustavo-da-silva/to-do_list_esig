import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TaskDataService implements InMemoryDbService {
  createDb() {
    const Tasks = [
      { id: 1, titulo: 'teste1', deadline: '2023-06-13T03:00:00.000Z', descricao:'aaaa', responsavel:'Luiz', prioridade:'Médio', andamento: true},
      { id: 2, titulo: 'teste2', deadline: '2023-06-13T03:00:00.000Z', descricao:'bbbb', responsavel:'Luiza', prioridade:'Grave', andamento: true},
      { id: 3, titulo: 'teste3', deadline: '2023-06-13T03:00:00.000Z', descricao:'cccc', responsavel:'julia', prioridade:'Fácil', andamento: true},
    ];

    return { Tasks };
  }
}
