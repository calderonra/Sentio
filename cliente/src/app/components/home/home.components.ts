import {Component,OnInit} from '@angular/core';

import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.components.html'
})
export class HomeComponent implements OnInit{
    public title:string;

    constructor(){
        this.title = 'Inicio | Sentio'
    }

    ngOnInit(){
        console.log('Se ha cargado el componente principal');
    }

    logout(){
        localStorage.clear()
    }
}