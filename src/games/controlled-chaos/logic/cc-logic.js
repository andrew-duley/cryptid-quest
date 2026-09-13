export class Game {
  constructor(update) {
    this.round = 0;
    this.playerStep = 0;
    this.activeChoice = null;
    this.playbackID = 0;
    this.patternDelay = 750;
    this.delay = 400;
    this.gap = 200;
    this.playerDelay = 250;
    this.inputID = 0;
    this.state = 'idle';
    this.loser = '';
    this.sequence = new Sequence();
    this.update = update;
  }

  actionDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async showPattern() {
    const currentID = this.playbackID;
    for (const char of this.sequence.pattern) {
      // How long Game displays selection
      this.activeChoice = char;
      this.update();
      await this.actionDelay(this.delay);
      if (currentID !== this.playbackID) return;
      // Time between selections
      this.activeChoice = null;
      this.update();
      await this.actionDelay(this.gap);
      if (currentID !== this.playbackID) return;
    }
    this.finishShowingPattern();
  }

  start() {
    if (this.state !== 'idle' && this.state !== 'game-over') {
      return;
    }

    this.playerStep = 0;
    this.state = 'showing-pattern';
    this.sequence.reset();
    this.sequence.addChoice();
    this.update();
    this.showPattern();
  }

  reset() {
    this.round = 0;
    this.playerStep = 0;
    this.state = 'idle';
    this.sequence.reset();
    this.activeChoice = null;
    this.playbackID ++;
    this.update();
  }

  nextRound() {
    this.round ++;
    this.playerStep = 0;
    this.state = 'showing-pattern'; 
    this.sequence.addChoice();
    this.update();
    this.showPattern();
  }

  finishShowingPattern() {
    this.state = 'player-input';
    this.activeChoice = null;
    this.update();
  }

  async handlePlayerChoice(choice) {
    if (this.state !== 'player-input') {
      return;
    }

    if (choice !== this.sequence.pattern[this.playerStep]) {
      this.loser = choice;
      this.lose();
      return;
    }
    this.playerStep ++;
    let didComplete = this.playerStep === this.sequence.pattern.length ? true : false;
    this.inputID ++;
    const currentInputID = this.inputID;
    const currentID = this.playbackID;
    this.activeChoice = choice;
    this.update();
    await this.actionDelay(this.playerDelay);
    if (currentInputID === this.inputID) {
      this.activeChoice = null;
      this.update();
    }

    if (didComplete) {
        await this.actionDelay(this.patternDelay);
        if (currentID !== this.playbackID) return;
        this.nextRound();
      }
  }

  lose() {
    this.playbackID ++;
    this.inputID ++;
    this.activeChoice = null;
    this.state = 'game-over';
    this.update();
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