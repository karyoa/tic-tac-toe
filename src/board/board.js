import React from 'react';
import Square from '../square/square';


class Board extends React.Component {
  renderSquare(i) {
    let active = false;

    if (this.props.winnerItems) {
      active = this.props.winnerItems.findIndex(item => item === i) !== -1
    }

    return (
      <Square
        value={this.props.squares[i]}
        active={active}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  getBoardRow(nums) {
    let res = [];
    const full = nums * nums;
    let curFull = 0;
    
    const f = () => {
      let res = [];

      for(let i = 0; i < nums; i++) {
        res.push(this.renderSquare(curFull++))
      }

      return res;
    }

    for(let i = 1; i <= nums; i++) {
      res.push(
        <div className="board-row">
          { f() }
        </div>
      )
    }

    return res;
  }

  render() {
    return (
      <div>{ this.getBoardRow(3) }</div>
    );
  }
}

export default Board;