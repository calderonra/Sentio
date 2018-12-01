import {Publication} from '../../models/publication';
import {PublicationService} from '../../services/publication.service';


@Components({


    providers: [UserService, PublicationService]
})
//dentro del export class

public publication: Publication;

//dentro del constructor private _userService
constructor(

    private _publicationService: PublicationService;
){
this.publication = new Publication("","","","",this.identity._id);
}
//metodo
onSubmit(form){
    //en el formulario del post se agrega (ngSubmit)=onSubmit(newPubForm)
    this._publicationService.addPublication(this.token, this.publication).subscribe(
        response =>{
            if(response.publication){
                //this.publication = response.publication;
                this.status = 'success';
                form.reset;
            }
            else{
                this.status = 'error';
            }
        },
        error =>{
            var errorMessage = <any>error;
            console.log(errorMessage);
            if(errorMessage!=null){
                this.status = 'error';
            }
        }
    );
}

//ver video 103, min 1:56

