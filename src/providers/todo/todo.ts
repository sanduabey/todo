import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  private todos = [];
  private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  getTodos(){
    return this.todos;
  }

  addTodo(todo){
    this.todos.push(todo);
  }

  archiveTodo(todoIndex) {
    let todoToArchive = this.todos[todoIndex];
    this.archivedTodos.push(todoToArchive);
    this.todos.splice(todoIndex, 1);
  }

  getArchivedTodos(){
    return this.archivedTodos;
  }

  editTodo(todoIndex, newText){
    this.todos[todoIndex] = newText;
  }

}
