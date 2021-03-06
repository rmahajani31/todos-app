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
    private showEdit: boolean;
    private editId: String;

    constructor(private http: Http) {
        this.baseUrl = "https://sleepy-fjord-38244.herokuapp.com/";
        this.showEdit = false;
        this.editId = null;
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
        if(!this.findTodo(text)) {
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

    public findTodo(text: String): any {
        let output = undefined;
        this.todos.forEach((todo) => {
            console.log("Info", todo.text, text);
            if(todo.text === text) {
                console.log("Returning true");
                output = todo;
            }
        });
        return output;
    }

    patchTodo(text: String) {
        console.log("Id is", this.editId);
        console.log("Text is", text);
        this.http.patch(`${this.baseUrl}todos/${this.editId}`, {
            text
        }).toPromise()
        .then((todo) => {
            console.log(todo);
        })
        .catch((err) => {
            console.log("Error", err);
        });
        this.showEdit = false;
        this.getTodos();
    }

    revealEdit(id: String) {
        this.editId = id;
        this.showEdit = true;
    }
}