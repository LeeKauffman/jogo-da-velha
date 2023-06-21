var vezDoPlayer = '';
const playerX = [];
const playerO = [];
const reset = document.querySelector('#reset');
const positions = document.querySelectorAll('.quadrado');
const boardDivs = document.querySelectorAll('.quadrado');
const ArrBoardDivs = Array.from(boardDivs);
const currentPlayer = document.getElementById("currentPlayer");
const btnPlayerX = document.querySelector('#playerX');
const btnPlayerO = document.querySelector('#playerO');
const choosePlayer = document.querySelector('.choosePlayer');


btnPlayerX.addEventListener('click', function(ev) {
  vezDoPlayer = 'X';
  currentPlayer.innerHTML = `Vez do jogador X`;
  choosePlayer.style.display = 'none';
});

btnPlayerO.addEventListener('click', function(ev) {
  vezDoPlayer = 'O';
  currentPlayer.innerHTML = `Vez do jogador O`;
  choosePlayer.style.display = 'none';
});

reset.addEventListener('click', function() {
  window.location.reload()
});

var casasSelecionadas = [];
let combinations =  [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let gameEnded = false;

boardDivs.forEach((div) => {
  div.addEventListener('click', function jogar(ev) {
    if(vezDoPlayer !== ''){
      if (!gameEnded && this.textContent === '') {
        this.textContent = vezDoPlayer;
  
      if (vezDoPlayer === 'X') {
        vezDoPlayer = 'O';
        currentPlayer.innerHTML = `Vez do jogador O`;
        playerX.push(parseInt(ev.target.dataset.position));
        console.log(playerX);
      } else {
        vezDoPlayer = 'X';
        currentPlayer.innerHTML = `Vez do jogador X`;
        playerO.push(parseInt(ev.target.dataset.position));
        console.log(playerO);
      }
  
      casasSelecionadas = ArrBoardDivs.map((div) => div.textContent);
  
      if (gameEnded) {
        boardDivs.forEach((div) => div.removeEventListener('click', jogar));
      }

      let isBoardFull = true;
        for (div of boardDivs) {
          if (div.textContent === '') {
            isBoardFull = false;
            break;
          }
        }

        if (isBoardFull && !gameEnded) {
          currentPlayer.innerHTML = 'Empate!';
          gameEnded = true;
        }
  
      for (combination of combinations) {
        const [a, b, c] = combination;
        if (playerX.includes(a) && playerX.includes(b) && playerX.includes(c)) {
          currentPlayer.innerHTML = 'O jogador X é o vencedor'
          destacar(combination);
          casasSelecionadas = [];
          gameEnded = true;
          removeHoverEffect();
          break;
        } else if (playerO.includes(a) && playerO.includes(b) && playerO.includes(c)) {
          currentPlayer.innerHTML = 'O jogador O é o vencedor';
          destacar(combination);
          casasSelecionadas = [];
          gameEnded = true;
          removeHoverEffect();
          break;
        }
      }
    }
  }
  });
});

function destacar(combination) {
  for (index of combination) {
    boardDivs[index].classList.add('winner');
  }
}