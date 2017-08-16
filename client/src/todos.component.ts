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
        this.http.get(`${this.baseUrl}todos`).toPromise()
        .then((todos) => {
            console.log(todos.json().todos);
            this.todos = todos.json().todos;
        })
        .catch((err) => {
            console.log("Error", err);
        });
    }

    onDelete(id: String) {
        this.http.delete(`${this.baseUrl}todos/${id}`).toPromise()
        .then((todo) => {
            console.log(todo.json());
        })
        .catch((err) => {
            console.log("Error", err);
        });
    }
}