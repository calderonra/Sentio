//Toda la carpetea dentro de la carpeta componet

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Publication} from '../../models/publicatio';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.services';

@Component({
    selector: 'timeline',
    templateUrl: './timepline.component.html',
    providers: [UserService]
})
export class TimelineComponet implements OnInit{
    public title: string;
    public identity;
    public token;
    
    public url:string;

    constructor(
        private _route: ActivateRoute,
        private _route: Router,
        private _userService: UserService
    ){
        this.title = 'Timeline';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('timeline, componente cargado correctamente');
    }


}