import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  beforeEditCache: string;
  editedTodo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      'todo-item': true,
      'is-completed': this.todo.completed,
      'editable': this.editedTodo,
    }

    return classes;
  }

  onToggle(todo){
    this.todoService.updateTodo(todo).subscribe(todo => console.log(todo));
  }

  onDelete(todo){
    this.deleteTodo.emit(todo);
  }

  editTodo(todo){
    this.beforeEditCache = todo.title;
    this.editedTodo = todo;
  }

  doneEdit(todo){
    if (!this.editedTodo){
      return;
    }

    this.editedTodo = null;

    if (todo.title != this.beforeEditCache){
      todo.title = todo.title.trim()
    } else {
      return;
    }

    if (!todo.title) {
      this.onDelete(todo)
    } else {
      console.log('done');
      this.todoService.updateTodo(this.todo).subscribe(todo => console.log(todo));
    }
  }

  cancelEdit(todo){
    this.editedTodo = null;
    todo.title = this.beforeEditCache;
  }

}
