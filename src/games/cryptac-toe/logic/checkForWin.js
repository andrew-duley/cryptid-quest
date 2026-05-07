import { winConditions } from './winConditions';

export function checkForWin(squares) {
    for (const [a, b, c] of winConditions) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];
      }
    }
    return null
  }
