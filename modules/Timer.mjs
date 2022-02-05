export class Timer {
  constructor(rootEl, game) {
    this.rootDiv = rootEl;
    this.timerDiv = {};
    this.timer = 0;
    this.game = game;

    this.generateTimer();
  }

  generateTimer() {
    this.timerDiv = document.createElement('div');
    this.timerDiv.className = 'timer';
    this.rootDiv.appendChild(this.timerDiv);
  }

  start() {
    this.displayTime(10, this.timerDiv);
  }

  end() {
    clearInterval(this.timer);
    this.game.scoring.gameOver();
    console.log('You lose');
  }

  displayTime(duration, div) {
    var timer = duration, minutes, seconds;
    this.timer = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      div.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
        this.end();
      }
    }, 1000);

    return `${minutes}:${seconds}`;
  }

}