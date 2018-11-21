let app ={
    init: function(){
        this.addEvents();
        this.loadContent();
    },
    addEvents: function() {
        document.postForm.addEventListener("submit",this.submitPost);
    },
    submitPost: function(event){
        event.preventDefault();
        alert('asdas');
    },
    loadContent: function(){
        fetch('/index',{
            method: 'POST'
        }).then(res=>console.log('torty es gay'))
    }
}