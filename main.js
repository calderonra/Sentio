window.onload = ()=> {
    app.init();
}
let app = {
    init: function(){
        //alert("Estoy presionando el boton");
        this.addEvents();
        this.loadContent();
    },
    addEvents:function(){
        
        document.Form.addEventListener('submit',this.submitPost);
    },
    submitPost:function(event){  //Capturando evento
        event.preventDefault();
        alert('Estoy presionando el boton');
    },
    loadContent:function(){
        fetch('/users/index',{
            method:'GET'
        }).then(res => {
            return res.json()
        })
    }
};

