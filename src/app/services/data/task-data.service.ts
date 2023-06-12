import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TaskDataService implements InMemoryDbService {
  createDb() {
    const Tasks = [
      { id: 1, titulo: 'teste1', deadline: '', descricao:'aaaa', responsavel:'Luiz', prioridade:'Médio'},
      { id: 2, titulo: 'teste2', deadline: '', descricao:'bbbb', responsavel:'Luiza', prioridade:'Grave'},
      { id: 1, titulo: 'teste3', deadline: '', descricao:'cccc', responsavel:'julia', prioridade:'Fácil'},
    ];

    return { Tasks };
  }
}
