import { Component, Output, EventEmitter } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

@Component({
    selector: 'register-todo',
    templateUrl: '../views/register.html'
})
export class RegisterComponent {

    @Output('onClick') postEmitter = new EventEmitter<String>();

    constructor() { }

    onClick(todoField: NgModel, form: NgForm): void {
        this.postEmitter.emit(todoField.viewModel);
        form.reset();
    }
}