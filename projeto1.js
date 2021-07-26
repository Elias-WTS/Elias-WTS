var qtdItens = 0;
var itensDaLista = [];
var marcados = [];
var marcadosLocalStorage = localStorage.getItem("marcado");
var txtItem;
var tempo = setInterval(relogio,1000);

function addItemNaLista() {
    let input = document.getElementById("input");

    if (input.value != "")
        txtItem = input.value;

    if (txtItem != "") {
        qtdItens = qtdItens + 1;
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("id", "checkbox"+qtdItens);

        let botao = document.createElement('button');
        botao.setAttribute("id", "botao"+qtdItens);

        let labelCheckbox = document.createElement("label");
        labelCheckbox.setAttribute("id","label"+qtdItens);
        labelCheckbox.innerHTML = txtItem;

        if (marcadosLocalStorage != null) {
            console.log("posicao marcado " + (qtdItens-1))
            console.log(marcadosLocalStorage[qtdItens-1])

            if (marcadosLocalStorage[qtdItens-1] == "s") {
                console.log("c")
                labelCheckbox.classList.add("textoRiscado");
                checkbox.checked = true;
            }
        }

        let lixo = document.createElement('img');
        lixo.src = "delete.png";
        lixo.style.maxWidth = "20px";
        botao.appendChild(lixo);

        let divFilho = document.createElement("div");
        divFilho.setAttribute("id", "div"+qtdItens);
        divFilho.classList.add("espacamentoDivChild");        
        divFilho.appendChild(checkbox);
        divFilho.appendChild(labelCheckbox);
        divFilho.appendChild(botao);

        document.getElementById("pai").appendChild(divFilho);

        itensDaLista.push(txtItem);
        salvarLista();

        botao.addEventListener("click", function() {
            if (confirm("Deseja excluir esse item?")) {
                let divDeletar;
                let labelDeletar;
                
                if (this.id.length >= 7) {
                    labelDeletar = document.getElementById("label"+this.id.substring(this.id.length-2, this.id.length))
                    divDeletar = document.getElementById("div"+this.id.substring(this.id.length-2, this.id.length));
                } else {
                    labelDeletar = document.getElementById("label"+this.id.substring(this.id.length-1, this.id.length))
                    divDeletar = document.getElementById("div"+this.id.substring(this.id.length-1, this.id.length));
                }
    
                itensDaLista.splice(itensDaLista.indexOf(labelDeletar.innerHTML),1);
                divDeletar.remove();
                qtdItens = qtdItens - 1;
                salvarLista();
                salvarMarcados();
            }

        }); 
    }

    function salvarLista() {
        localStorage.setItem("lista", JSON.stringify(itensDaLista));
    }

    function salvarMarcados() {
        for (let i = 1; i <= qtdItens; i++) {
            let checkbox = document.getElementById("checkbox"+i);
            checkbox.type = "checkbox";
            marcados.push(checkbox.checked ? "s" : "n");
            localStorage.setItem("marcado", JSON.stringify(marcados));
        }
    }
    
    input.value = "";
    input.focus();

    $(document).click(function(){
        marcados = [];

        if (qtdItens > 0) {
            for (let i = 1; i <= qtdItens; i++) {
                let label = document.getElementById("label"+i);
                let chk = document.getElementById("checkbox"+i);
    
                if (chk != null) {
                    if (document.getElementById("checkbox"+i).checked)
                        label.classList.add("textoRiscado");
                    else 
                        label.classList.remove("textoRiscado");
                }
            }

            salvarMarcados();
        }
    });
}

function carregarLista() {
    let listaLocalStorage = localStorage.getItem("lista");
    
    if (listaLocalStorage != "") {
        listaLocalStorage = JSON.parse(listaLocalStorage);
        marcadosLocalStorage = JSON.parse(marcadosLocalStorage);
       
        for (let i = 0; i < listaLocalStorage.length; i++) {
            txtItem = listaLocalStorage[i];
            addItemNaLista();
        }
        
    }
}

function relogio() {
    let data = new Date();
    let hor = data.getHours();
    let min = data.getMinutes();
    let seg = data.getSeconds();

    if (hor < 10) {
        hor="0" + hor;
    }

    if (min < 10) {
        min = "0" + min;
    }

    if (seg < 10) {
        seg = "0" + seg;
    }

    let horas = hor + ":" + min + ":" + seg;
    document.getElementById("rel").value = horas;
}
