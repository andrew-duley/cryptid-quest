export class Game {
  constructor(update) {
    this.round = 0;
    this.score = 0;
    this.playerStep = 0;
    this.activeChoice = null;
    this.delay = 1000;
    this.state = 'idle';
    this.sequence = new Sequence();
    this.update = update;
  }

  actionDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async showPattern() {
    for (const char of this.sequence.pattern) {
      this.activeChoice = char;
      this.update();
      await this.actionDelay(this.delay)
    }
  }

  start() {
    this.round = 1;
    this.score = 0;
    this.playerStep = 0;
    this.state = 'showing-pattern';
    this.sequence.reset();
    this.sequence.addChoice();
    this.update();
  }

  reset() {
    this.round = 0;
    this.score = 0;
    this.playerStep = 0;
    this.state = 'idle';
    this.sequence.reset();
    this.update();
  }

  nextRound() {
    this.round ++;
    this.score ++;
    this.playerStep = 0;
    this.state = 'showing-pattern';
    this.sequence.addChoice();
    this.update();
  }

  finishShowingPattern() {
    this.state = 'player-input';
  }

  handlePlayerChoice(choice) {
    if (this.state !== 'player-input') {
      return;
    }

    if (choice !== this.sequence.pattern[this.playerStep]) {
      this.lose();
      return;
    }

    this.playerStep ++;

    if (this.playerStep === this.sequence.pattern.length) {
        this.nextRound();
      }
  }

  lose() {
    this.state = 'game-over';
    console.log('You Lose!');
  }
}

export class Sequence {
  constructor() {
    this.pattern = [];
    this.choices = ['brutus', 'burnella', 'grumbit', 'sparkplug'];
  }

  addChoice() {
    this.randIndex = (Math.floor(Math.random() * this.choices.length));
    this.randChoice = this.choices[this.randIndex];

    this.pattern.push(this.randChoice);
  }

  reset() {
    this.pattern = [];
  }
}