import { Component, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'register-todo',
    templateUrl: '../views/register.html'
})
export class RegisterComponent {

    @Output('onClick') postEmitter = new EventEmitter<String>();

    constructor() { }

    onClick(todoField: NgModel): void {
        this.postEmitter.emit(todoField.viewModel);
    }
}