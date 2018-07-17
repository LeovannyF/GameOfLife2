class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {

    let boardArr = [];
    while(boardArr.length < this.height){
      let holdArr = [];
      for(let i =0; i<this.width; i++){
        holdArr.push(0);
      }
      boardArr.push(holdArr);
    }
    return boardArr;

  }

  randomize(){
    for(let i = 0; i < this.board.length; i++){
      for(let j= 0; j < this.board[i].length; j++){
        let random = Math.random()
         this.board[i][j] = Math.round(random);
      }
    }
  }

  clear(){
    const newBoard = this.makeBoard();

    this.board = newBoard;
  }

  //Returns the cell value for the given row and col coordinates.
  getCell(row,col) {

    if(!this.board[row]){
      return 0;
    }
    if(!this.board[row][col]) {
      return 0;
    }
  return this.board[row][col];


  }
//sets the value of a cell
  setCell(value, row, col) {
    this.board[row][col] = value;
  }

//toggles the value of a cell
  toggleCell(row, col) {
    if(this.board[row][col] === 0){
      this.board[row][col] = 1;
    }
    else {
      this.board[row][col] = 0;
    }
  }

   //Return the amount of living neighbors around a given coordinate.

  livingNeighbors(row, col) {
    let possibleArr =
          [this.getCell(row-1, col-1),
            this.getCell(row-1, col),
            this.getCell(row-1, col+1),
            this.getCell(row, col -1),
            this.getCell(row, col+1),
            this.getCell(row+1, col),
            this.getCell(row+1, col-1),
            this.getCell(row+1, col+1)];

    let totalAlive = possibleArr.reduce(function(init, current){
      // console.log(current);
      init += current;

      return init;

    },0);

    return totalAlive;
  }


  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
      for(let i = 0; i < this.board.length; i++){
        for(let j = 0; j < this.board[i].length; j++){

        let currentCell = this.getCell(i,j);
        let totalNieghbs = this.livingNeighbors(i,j);

         if(totalNieghbs === 3 ){
          newBoard[i][j] = 1;
        }
        
        else if (totalNieghbs === 2 && currentCell === 1) {
          newBoard[i][j] = 1;
        }
      }
    }
    this.board = newBoard;
  }
}
if(typeof module !== 'undefined'){
  module.exports = GameOfLife;
}
