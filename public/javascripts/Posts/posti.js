window.onload = () => {
    app.init();
}

let app ={
    init: function () {
        this.addEvents();
        this.loadContent();
    },
    addEvents: function () {
        document.postForm.addEventListener("submit", (event) => {
            this.submitPost(event, this.addRow);
        });
    },
    addRow: function (data) {
        let tbody = document.getElementsByClassName("tajeta")[0];
        let tr = document.createElement("div");
        tr.className="tarjeta";
        tr.className="col-md-4";
        
        let hijo= document.createElement("div");
        hijo.className="card";
        hijo.className="mb-4";
        hijo.className="shadow-sm";

        let nieto=document.createElement("img");
        nieto.setAttribute("data-src","holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail'");
        nieto.className="card-img-top";
        
        let nieto2=document.createElement("div");
        nieto2.className="card-body";

        let bisnieto2=document.createElement("a");
        bisnieto2.className="sidebar-heading";
        bisnieto2.className="text-muted";
        bisnieto2.setAttribute("href","#");

        let bisnieto22=document.createElement("hr");

        let bisnieto222=document.createElement("p");
        bisnieto222.className="card-text";

        let bisnieto2222=document.createElement("div");
        bisnieto2222.className="d-flex";
        bisnieto2222.className="justify-content-between";
        bisnieto2222.className="align-items-center";

        let fecha=document.createElement("small");
        fecha.className="text-muted";



        let tataranieto2222=document.createElement("div");
        tataranieto2222.className="btn-group";

        let boton1tatara = document.createElement("button");
        boton1tatara.className="btn";
        boton1tatara.className="btn-outline-secondary";
        boton1tatara.className="btn-sm";
    
        boton1tatara.setAttribute("type","button");
        boton1tatara.createTextNode("comentar");

        let boton2tatara = document.createElement("button");
        boton2tatara.className="btn";
        boton2tatara.className="btn-outline-secondary";
        boton2tatara.className="btn-sm";
        boton2tatara.setAttribute("type","button");
        boton2tatara.createTextNode("me gusta");
        let tataranieto=document.createElement("strong");
        //tataranieto.createTextNode()



        tr.appendChild(hijo);
        hijo.appendChild(nieto);
        hijo.appendChild(nieto2);
        nieto2.appendChild(bisnieto2);
        nieto2.appendChild(bisnieto22);
        nieto2.appendChild(bisnieto222);
        nieto2.appendChild(bisnieto2222);
        bisnieto2222.appendChild(tataranieto2222);
        bisnieto2222.appendChild(fecha);
        tataranieto2222.appendChild(boton1tatara);
        tataranieto2222.appendChild(boton2tatara);


        tr.innerHTML = `<td>${data._id} </td>
                        <td>${data.nombre}</td>
                        <td>${data.autor}</td>
                        <td>
                            <a href="#" class="delete"> Delete </a> 
                            <a href="#" class="update"> Update </a>
                        </td>`;
        tr.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
            this.deletePost(event, data, tr, tbody);
        });
        tr.getElementsByClassName("update")[0].addEventListener("click", (event) => {
            this.updatePost(tr, tbody, data);
        });
        tbody.appendChild(tr);
    },
}