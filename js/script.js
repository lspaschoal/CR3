// Selecionando os elementos
const baseA = {
    elemento: document.getElementById('ladoABase'),
    angulo: 0
};
const baseB = {
    elemento: document.getElementById('ladoBBase'),
    angulo: 0
};
const discoA = {
    elemento: document.getElementById('ladoA1'),
    angulo: 0
};
const cursor = {
    elemento: document.getElementById('ladoACursor'),
    angulo: 0
};
const discoB1 = {
    elemento: document.getElementById('ladoB1'),
    angulo: 0
};
const discoB2 = {
    elemento: document.getElementById('ladoB2'),
    angulo: 0
};

// Adicionando efeito de rotação
let adicionaEfeitoRotacao = objeto => {
    let ativo = false;
    let angulo = 0;
    let rotacao = 0;
    let anguloInicial = objeto.anguloInicial;
    let centro = {
        x: 0,
        y: 0
    }

    objeto.elemento.addEventListener("mousedown", e => {
        e.preventDefault();
        let referencia = objeto.elemento.getBoundingClientRect();
        let topo = referencia.top,
            esquerda = referencia.left,
            altura = referencia.height,
            largura = referencia.width;
        centro.x = esquerda + (largura / 2);
        centro.y = topo + (altura / 2);
        anguloInicial = (180 / Math.PI) * Math.atan2(e.clientY - centro.y, e.clientX - centro.x);
        return ativo = true;
    }, false);
    
    objeto.elemento.addEventListener("touchstart", e => {
        e.preventDefault();
        let referencia = objeto.elemento.getBoundingClientRect();
        let topo = referencia.top,
            esquerda = referencia.left,
            altura = referencia.height,
            largura = referencia.width;
        centro.x = esquerda + (largura / 2);
        centro.y = topo + (altura / 2);
        anguloInicial = (180 / Math.PI) * Math.atan2(e.clientY - centro.y, e.clientX - centro.x);
        return ativo = true;
    }, false)

    objeto.elemento.addEventListener("mousemove", e => {
        let d, x, y;
        e.preventDefault();
        x = e.clientX - centro.x;
        y = e.clientY - centro.y;
        d = (180 / Math.PI) * Math.atan2(y, x);
        rotacao = d - anguloInicial;
        if (ativo) {
            objeto.angulo = angulo + rotacao
            if (objeto === baseA) {
                discoA.elemento.style.transform = "rotate(" + (discoA.angulo + objeto.angulo) + "deg)";
            }
            if (objeto === baseB) {
                discoB1.elemento.style.transform = "rotate(" + (discoB1.angulo + objeto.angulo) + "deg)";
                discoB2.elemento.style.transform = "rotate(" + (discoB2.angulo + objeto.angulo) + "deg)";
            }
            return objeto.elemento.style.transform = "rotate(" + objeto.angulo + "deg)";
        }
    }, false);
    
    objeto.elemento.addEventListener("touchmove", e => {
        let d, x, y;
        e.preventDefault();
        x = e.clientX - centro.x;
        y = e.clientY - centro.y;
        d = (180 / Math.PI) * Math.atan2(y, x);
        rotacao = d - anguloInicial;
        if (ativo) {
            objeto.angulo = angulo + rotacao
            if (objeto === baseA) {
                discoA.elemento.style.transform = "rotate(" + (discoA.angulo + objeto.angulo) + "deg)";
            }
            if (objeto === baseB) {
                discoB1.elemento.style.transform = "rotate(" + (discoB1.angulo + objeto.angulo) + "deg)";
                discoB2.elemento.style.transform = "rotate(" + (discoB2.angulo + objeto.angulo) + "deg)";
            }
            return objeto.elemento.style.transform = "rotate(" + objeto.angulo + "deg)";
        }
    }, false);

    objeto.elemento.addEventListener("mouseup", e => {
        angulo += rotacao;
        return ativo = false;
    }, false);
    
    objeto.elemento.addEventListener("touchend", e => {
        angulo += rotacao;
        return ativo = false;
    }, false);
}
adicionaEfeitoRotacao(baseA);
adicionaEfeitoRotacao(discoA);
adicionaEfeitoRotacao(cursor);
adicionaEfeitoRotacao(baseB);
adicionaEfeitoRotacao(discoB1);
adicionaEfeitoRotacao(discoB2);

// Canvas
const canvas = document.getElementById("ladoB2");
const ctx = canvas.getContext("2d");

const bgImg = document.createElement('img');
bgImg.setAttribute('src', './img/LADO_B_DISCO-2.png');

const marcador = document.createElement('img');
marcador.setAttribute('src', './img/marcador.png');

const recarregarCanvas = (function recarregar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(marcador, canvas.width / 2, canvas.height / 2, 15, 15);
    return recarregar
})()

// Ler posição do mouse no canvas
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Manipulação do marcador
canvas.addEventListener("mouseup", function (evt) {
    evt.preventDefault();
    switch (evt.button) {
        case 0:
            // botao esquerdo
            adicionaEfeitoRotacao(discoB2);
            break;
        case 1:
            // botao do meio
            canvas.style.transform = `rotate(0deg)`;
            break;
        case 2:
            // botao direito
            let mousePos = getMousePos(canvas, evt);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(marcador, mousePos.x - 5, mousePos.y - 5, 15, 15);
            break;
        default:
    }
}, false);

// Botão de trocar o lado
document.getElementById('trocar_lado').addEventListener('click', () => {
    document.getElementById('ladoA').hidden = !document.getElementById('ladoA').hidden;
    document.getElementById('ladoB').hidden = !document.getElementById('ladoB').hidden;
    recarregarCanvas();
})

// Carregando o tamanho do canvas de acordo com o tamanho do viewport
window.addEventListener('load', resizeCanvas,false);
window.addEventListener('resize', () => {
    resizeCanvas();
    recarregarCanvas();
})
function resizeCanvas(){
    discoB2.elemento.width = Math.min(window.innerHeight, window.innerWidth) * 0.76;
    discoB2.elemento.height = discoB2.elemento.width;
}
