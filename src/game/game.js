import React from 'react';
import Board from '../board/board';
import { TransitionGroup, CSSTransition } from 'react-transition-group'


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        isWinner: squares[a],
        items: [a, b, c]
      };
    }
  }
  return {
    isWinner: null,
    items: null
  };
}

function isEndCells(squares) {
  return squares.find(cell => cell === null) === null;
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).isWinner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <a href="#" 
           key={move} 
           class="list-group-item list-group-item-action"
           onClick={() => this.jumpTo(move)} >
          {desc}
        </a>  
      );
    });

    const historyBlock = (
      <div className="game-info">
          {/* <ol>{moves}</ol> */}
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action active">
            History
            </a>
            {moves}
          </div>
        </div>
    );

    

    let status;
    if (winner.isWinner) {
      status = "Winner: " + winner.isWinner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    if (!isEndCells(current.squares)) {
      status = "Draw"
    }

    let displayHistory = this.state.stepNumber > 0;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerItems={winner.items}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <TransitionGroup>
          {displayHistory && (
            <CSSTransition in={displayHistory} timeout={200} classNames="option">
              <div>
                <h6 className="status">{status}</h6>
                {historyBlock}
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default Game;