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
        let tr = document.createElement("   tr");
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