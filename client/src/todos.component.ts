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
        if(!this.exists(text)) {
            this.http.post(`${this.baseUrl}todos`, {
                text
            }).toPromise()
            .then((todo) => {
                console.log(todo);
            })
            .catch((err) => {
                console.log("Error", err);
            });
            this.getTodos();
        }
    }

    public exists(text: String): boolean {
        let output: boolean = false;
        this.todos.forEach((todo) => {
            console.log("Info", todo.text, text);
            if(todo.text === text) {
                console.log("Returning true");
                output = true;
            }
        });
        return output;
    }

    patchTodo(id: String) {

    }
}