import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

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
            this.todos = todos;
        })
        .catch((error) => {
            console.log("Error", error);
        });
    }
}