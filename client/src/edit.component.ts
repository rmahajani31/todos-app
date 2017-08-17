import { Component, Output, EventEmitter } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

@Component({
    selector: 'edit-todo',
    templateUrl: '../views/edit.html'
})
export class EditComponent {
    @Output('onClick') patchEmitter = new EventEmitter<String>();

    constructor() {}

    public onClick(todoField: NgModel, form: NgForm) {
        console.log(todoField.viewModel);
        this.patchEmitter.emit(todoField.viewModel);
        form.reset();
    } 
}