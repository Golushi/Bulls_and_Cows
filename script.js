// initialiser les variables
let attempts = 0; let bulls = 0; let cows = 0;
let secretNumber = generateSecretNumber();

console.log(secretNumber);

let roundStats = {
    round: 1,
    wins: 0,
    loses: 0
}

function checkGuess() {
    let guess = document.getElementById("guessInput").value; // nombre en chaine de caractere ( nombre que le joueur ecrit)
    let secretString = secretNumber.join(''); // secretNumber = array de nombre, et 'join' converti en chaine de caractere de nombre (9,4,2,8 => 9428)
    bulls =0; cows = 0; // On réinitialise

    const checkGuessLength = new Set(guess); // Verifier que les nombres soient differents ( Enleve les duplicatat)

    if (guess.length !== checkGuessLength.size || guess.length !== 4) {  // Avoir 4 chiffres differents
        document.getElementById("logsArea").value += `${guess}; est invalide, veuillez entrer un nombre composé d'exactement 4 chiffres différents. \n`;
        return null; // on renvoi une erreur
    }

    attempts += 1; 

    // On verifie le résultat
    for(let i =0; i < 4; i += 1) {
        if (secretString[i] === guess[i]) { // Chiffre présent à la bonne place
            bulls += 1;
        } else if (secretString.includes(guess[i])) { // Chiffre présent mais pas à la bonne place
            cows += 1;
        }
    }
    // Verification de victoire
    if (bulls === 4) {
        document.getElementById("logsArea").value += `${secretString} | Bravo, vous avez gagné en ${attempts} essais ! \n`;
        roundStats.wins += 1;
        return playAgain();
    } else if (attempts === 10) { // Défaite car 10 tentatives
        document.getElementById("logsArea").value += `${secretString} Dommage, vous avez perdu! Le numéro etait : ${secretString}\n`;
        roundStats.loses += 1;
        return playAgain();
    }

    document.getElementById("logsArea").value += `${guess} - ${bulls}B ${cows}C, try: ${attempts}\n`;
}

function playAgain() {
    roundStats.round += 1;
    printGameStats(); // Mettre à jour le round, on remet tout a 0
    attempts = 0; bulls =0; cows = 0;
    secretNumber = generateSecretNumber(); // Regenerer un nombre secret
    console.log(secretNumber);
}


// Mettre à jour les stats de parties de roundStats
function printGameStats() {
    const gameStats = document.getElementById("gameStats");
    gameStats.innerHTML = `R: ${roundStats.round} | V: ${roundStats.wins} | D: ${roundStats.loses}`;
}


// Generer le code secret au hazard 
function generateSecretNumber() {
    const numbers = Array.from({ length: 9}, (v, k) => k + 1); // [1 ... 9]
    let currentIndex = numbers.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [numbers[currentIndex], numbers[randomIndex]] = [numbers[randomIndex], numbers[currentIndex]]; // Melange
    }

    return numbers.slice(0, 4);
}

// Remplir la zone avec une chaine de caractere vide pour effacer les logs
function clearLogs() {
    document.getElementById("logsArea").value = "";
}

// Créer une alerte qui donne les regles au clic de Rules
function printRules() {
    alert("Entrez un nombre composé de 4 chiffres différents dans la case à côté de 'Guess'. L'ordinateur le compare avec le code secret et vous donne deux indices: les numéros 'bulls' (B) et des cows (C). Qu'est ce que cela signifie? Un 'bulls' est un chiffre qui est présent dans les deux codes à la même position. Un 'cows' est un chiffre qui est présent dans les deux codes mais à une position différente. Par exemple, si le code secret est 7512 et que vous essayez 5392, la réponse sera '1B 1C' (1 bull 1 cow). C'est tout!")
}
