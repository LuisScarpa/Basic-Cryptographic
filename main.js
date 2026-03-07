console.log("Teste");


// Part One: Atbash Cipher (Parte Um: Cifra Atbash)
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

// Second Part: Caesar Cipher (Segunda Parte: Cifra de César)
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

// Part Three: Vigenère Cipher (Terceira Parte: Cifra de Vigenère)
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


