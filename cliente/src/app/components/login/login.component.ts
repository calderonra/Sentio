import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status:string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Inicia sesión en Sentio';
        this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
    }

    ngOnInit() {
        console.log('Componente de login cargado')
    }

    onSubmit() {
        //Loguear al usuario y conseguir sus datos
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                if(!this.identity || this.identity._id){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    //Persistir datos del usuario
                    localStorage.setItem('identity',JSON.stringify(this.identity));

                    //conseguir el token
                    this.getToken();
                }
                this.status = 'success';
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage)
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    getToken(){
        this._userService.signup(this.user,'true').subscribe(
            response => {
                this.token = response.token;
                if(this.token.length <= 0){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    //Persistir datos del usuario
                    localStorage.setItem('token',JSON.stringify(this.token));
                    //conseguir los contadores o estadisticas del usario

                    this._router.navigate(['/']);
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage)
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }
}