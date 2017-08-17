import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TodosComponent } from './todos.component';
import { RegisterComponent } from './register.component';
import { EditComponent } from './edit.component';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [AppComponent, TodosComponent, RegisterComponent, EditComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}