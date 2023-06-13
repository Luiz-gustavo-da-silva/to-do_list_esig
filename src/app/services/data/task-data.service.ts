import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TaskDataService implements InMemoryDbService {
  createDb() {
    const Tasks = [
      { id: 1, title: 'teste1', deadline: '2023-06-13T03:00:00.000Z', description:'aaaa', responsible:'Luiz', priority:'Média', situation: true},
      { id: 2, title: 'teste2', deadline: '2023-06-13T03:00:00.000Z', description:'bbbb', responsible:'Luiza', priority:'Grave', situation: false},
      { id: 3, title: 'teste3', deadline: '2023-06-13T03:00:00.000Z', description:'cccc', responsible:'julia', priority:'Fácil', situation: true},
    ];

    return { Tasks };
  }
}
