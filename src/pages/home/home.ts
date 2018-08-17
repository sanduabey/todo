import { Component } from '@angular/core';
import { NavController, AlertController , reorderArray , ToastController} from 'ionic-angular';

import { TodoProvider } from '../../providers/todo/todo';

import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor( private toastController: ToastController ,private todoProvider: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoProvider.getTodos();
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A To Do",
      message: "Enter Your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData)=>{
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000 //in milliseconds
              });
              addTodoToast.present();
            });
          }
        }
      ]
    });
    addTodoAlert.present();
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodo(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);
  }

  editTodo(todoIndex){
    let todoToEdit = this.todos[todoIndex];

    let editTodoAleart = this.alertController.create({
      title: "Edit Todo",
      message: "Edit selected Todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value: todoToEdit
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData) =>{
            let editedText = inputData.editTodoInput;
            this.todoProvider.editTodo(todoIndex,editedText);

            editTodoAleart.onDidDismiss(()=>{
              let todoEditedToast = this.toastController.create({
                message: "Todo Edited",
                duration: 3000
              });
              todoEditedToast.present();
            });
          }
        }
      ]
    });
    editTodoAleart.present();
  }
}
