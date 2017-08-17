import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-todos',
    templateUrl: '../views/todos.html'
})
export class TodosComponent {

    private baseUrl: String;
    private todos;

    constructor(private http: Http) {
        this.baseUrl = "https://sleepy-fjord-38244.herokuapp.com/";
        this.getTodos();
    }

    deleteTodo(id: String): void {
        this.http.delete(`${this.baseUrl}todos/${id}`).toPromise()
        .then((todo) => {
            console.log(todo.json());
            this.getTodos();
        })
        .catch((err) => {
            console.log("Error", err);
        });
    }

    getTodos(): void {
        this.http.get(`${this.baseUrl}todos`).toPromise()
        .then((todos) => {
            console.log(todos.json().todos);
            this.todos = todos.json().todos;
        })
        .catch((err) => {
            console.log("Error", err);
        });
    }

    postTodo(text: String): void {
        console.log(text);
    }
}