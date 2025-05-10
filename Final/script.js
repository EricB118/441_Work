$(document).ready(function () {
    
  const totalBoxes = 25;
    const activeBoxes = [];
    let score = 0;
    let timeLeft = 30;
    let gameInterval, timerInterval;
  
    function initBoard() {
      
      $('#game-board').empty();
      for (let i = 0; i < totalBoxes; i++) {
        $('#game-board').append(`<div class="box" data-id="${i}"></div>`);
      }
    }
  
    function activateRandomBox() {
     
      $('.box').removeClass('active');
      activeBoxes.length = 0;
      const randomIndex = Math.floor(Math.random() * totalBoxes);
      $(`.box[data-id="${randomIndex}"]`).addClass('active');
      activeBoxes.push(randomIndex);
    }
  
    function updateScore() {
      
      $('#score').text(score);
      const best = localStorage.getItem('bestScore') || 0;
      if (score > best) {
        localStorage.setItem('bestScore', score);
      }
      $('#best').text(localStorage.getItem('bestScore'));
    }
  
    function startGame() {
      
      score = 0;
      timeLeft = 30;
      $('#time').text(timeLeft);
      updateScore();
      activateRandomBox();
  
      gameInterval = setInterval(() => {
        activateRandomBox();
      }, 800);
  
      timerInterval = setInterval(() => {
        timeLeft--;
       
        $('#time').text(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(gameInterval);
          clearInterval(timerInterval);
          $('.box').removeClass('active');
          alert('Time\'s up! Final Score: ' + score);
        }
      }, 1000);
    }
  
    $('#game-board').on('click', '.box.active', function () {
      score++;
      updateScore();
      activateRandomBox();
    });
  
    $('#start-btn').click(() => {
      
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      initBoard();
      startGame();
    });
  
  
    initBoard();
    updateScore();
  });
  