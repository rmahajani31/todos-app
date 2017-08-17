import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'register-todo',
    templateUrl: '../views/register.html'
})
export class RegisterComponent {

    private baseUrl: String;

    constructor(private http: Http) {
        this.baseUrl = "https://sleepy-fjord-38244.herokuapp.com/";
    }

    postTodo(todoField: NgModel): void {
        console.log(todoField);
    }
}