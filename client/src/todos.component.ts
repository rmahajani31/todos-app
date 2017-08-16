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
            console.log(todos.json());
            this.todos = todos;
        })
        .catch((error) => {
            console.log("Error", error);
        });
    }
}