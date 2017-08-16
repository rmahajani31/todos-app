import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'my-todos',
    templateUrl: '../views/todos.html'
})
export class TodosComponent {

    private baseUrl: String;

    constructor(private http: Http) {
        this.baseUrl = "https://sleepy-fjord-38244.herokuapp.com/";
    }
}