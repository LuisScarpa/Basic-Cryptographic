console.log("Teste");


// Primeira Parte: Cifra de Atbash
function cifrarAtbash(mensagem) {
    let txtCifrado = ""
    let letrasEntrada = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz"
    //console.log("tamanho: ", mensagem.length);
    for (let i = 0; i < mensagem.length; i++) {
        let letra = mensagem.charAt(i);
        let letraCifrada = ""
        let pos = letrasEntrada.lastIndexOf(letra)
        if (pos != -1) {
            let posCifrada = letrasEntrada.length - pos - 1
            letraCifrada = letrasEntrada.charAt(posCifrada)
        } else {
            letraCifrada = letra
        }
        txtCifrado = txtCifrado + letraCifrada
    }
    return txtCifrado
}

// Segunda Parte: Cifra de César
function cifrarCesar(mensagem, chave) {
    let txtCifrado = ""
    let letrasEntrada = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz"
    for (let i = 0; i < mensagem.length; i++) {
        let letra = mensagem.charAt(i);
        let pos = letrasEntrada.lastIndexOf(letra)
        let posCifrada = 0
        if (pos != -1) {
            if (pos + chave < 0) {
                posCifrada = letrasEntrada.length + pos + chave
            } else {
                posCifrada = (pos + chave) % letrasEntrada.length                
            }
            letraCifrada = letrasEntrada.charAt(posCifrada)
        } else {
            letraCifrada = letra
        }
        txtCifrado = txtCifrado + letraCifrada
    }
    return txtCifrado
}

// Terceira Parte: Cifra de Vigenère
function cifrarVigenere(mensagem, palavraChave, modo = 'codificar') {
let resultado = ""
let alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
let chave = palavraChave.toLowerCase()
let indiceChave = 0
for (let i = 0; i < mensagem.length; i++) {
let letra = mensagem[i]
let posLetra = alfabeto.indexOf(letra)
if (posLetra != -1) {
let base = posLetra < 26 ? 0 : 26
let letraChave = chave[indiceChave % chave.length]
let valorChave = alfabeto.indexOf(letraChave) % 26
let deslocamento = modo === 'codificar' ? valorChave : -valorChave
let novaPos = (posLetra - base + deslocamento) % 26
if (novaPos < 0) novaPos += 26
resultado += alfabeto.charAt(novaPos + base)
indiceChave++
} else {
resultado += letra
}
}
return resultado
}

//parte 4: RSA 
function gerarChavesRSA_Didaticas(p, q) {
    if (p <= 1 || q <= 1) return null; 
    const N = p * q;
    const phi_N = (p - 1) * (q - 1);
    let E = 3;
    while (E < phi_N) {
        if ((phi_N % E !== 0) && ((p - 1) % E !== 0) && ((q - 1) % E !== 0)) break;
        E++;
    }
    let D = 1;
    while (D < phi_N) {
        if ((D * E) % phi_N === 1) break;
        D++;
    }
    return { publica: { E, N }, privada: { D, N } };
}

function cifrarRSA_Didatico(mensagem, E, N) {
    let resultado = [];
    for (let i = 0; i < mensagem.length; i++) {
        let x = mensagem.charCodeAt(i);
        let cifrado = Number(BigInt(x) ** BigInt(E) % BigInt(N));
        resultado.push(cifrado);
    }
    return resultado;
}

function decifrarRSA_Didatico(mensagemCifrada, D, N) {
    let resultado = "";
    for (let i = 0; i < mensagemCifrada.length; i++) {
        let C = mensagemCifrada[i];
        let original = Number(BigInt(C) ** BigInt(D) % BigInt(N));
        resultado += String.fromCharCode(original);
    }
    return resultado;
}

function acaoCifrarRSA() {
    let txt = document.getElementById("txtEntrada").value;
    let chaves = gerarChavesRSA_Didaticas(17, 11);
    
    let resultado = cifrarRSA_Didatico(txt, chaves.publica.E, chaves.publica.N);
    
    document.getElementById("resp1").innerText = resultado.join(", ");
}

function acaoDecifrarRSA() {
    let txt = document.getElementById("txtSaida").value;
    let chaves = gerarChavesRSA_Didaticas(17, 11);
    
    let arrayCifrado = txt.split(",").map(num => Number(num.trim()));
    
    let resultado = decifrarRSA_Didatico(arrayCifrado, chaves.privada.D, chaves.privada.N);
    document.getElementById("resp2").innerText = resultado;
}


function acaoCifrarVigenere() {
let txt = document.getElementById("txtEntrada").value
let chave = prompt("Digite a palavra-chave:")
if (chave) document.getElementById("resp1").innerText = cifrarVigenere(txt, chave, 'codificar')
}

function acaoDecifrarVigenere() {
let txt = document.getElementById("txtSaida").value
let chave = prompt("Digite a palavra-chave:")
if (chave) document.getElementById("resp2").innerText = cifrarVigenere(txt, chave, 'decodificar')
}

function acaoCifrarCesar() {
    let txtOriginal = document.getElementById("txtEntrada").value
    let txtCifrado = cifrarCesar(txtOriginal, 3)
    document.getElementById("resp1").innerText = txtCifrado
}

function acaoDecifrarCesar() {
    let txtOriginal = document.getElementById("txtSaida").value
    let txtCifrado = cifrarCesar(txtOriginal, -3)
    document.getElementById("resp2").innerText = txtCifrado
}


function cifrar() {
    let txtOriginal = document.getElementById("txtEntrada").value
    let txtCifrado = cifrarAtbash(txtOriginal)
    document.getElementById("resp1").innerText = txtCifrado
}
function decifrar() {
    let txtOriginal = document.getElementById("txtSaida").value
    let txtCifrado = cifrarAtbash(txtOriginal)
    document.getElementById("resp2").innerText = txtCifrado
}

