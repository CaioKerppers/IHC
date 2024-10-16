let numeros = [10, 5, 8, 12, 20, 1];  // Exemplo de vetor
let maior = numeros[0];
for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
        maior = numeros[i];
    }
}
console.log("O maior número é: " + maior);
