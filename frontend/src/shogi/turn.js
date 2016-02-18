export default class Turn {
  constructor() {
    this.turn = 'black';
  }

  showReadableTurn() {
    switch(this.turn) {
    case 'black':
      return '先手';
    case 'white':
      return '後手';
    default:
      return undefined;
    }
  }
}
