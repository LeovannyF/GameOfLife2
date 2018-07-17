const expect = require('chai').expect;
const GameOfLife = require('../GameOfLife.js');

describe('Game of life constructor exists', ()=>{
  it('exists', ()=> {
    expect(GameOfLife).to.be.ok;
  });
});

describe('it properly uses the make board function', ()=>{

  it('can make a 2D Array 3x3', ()=>{
    const game = new GameOfLife(3,3);
    expect(game.board).to.be.eql(
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    );
  });
  it('can make different 2D 2x2', ()=>{
    const game = new GameOfLife(5,5);
    expect(game.board).to.be.eql(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    );
  });
});

describe('uses getCell to return a value', ()=>{
    const game = new GameOfLife(5,5);
  it('returns the value at a specfic cell cordinate', ()=>{
    game.board[0][0] = 1;
    expect(game.getCell(0,0)).to.be.equal(1);
  });
  it('returns error if the cell is out of relm of life', ()=>{
    expect(game.getCell(6,6)).to.be.eql(0);
  });
  it('works on negative numbers', ()=>{
    expect(game.getCell(-1,-1)).to.be.eql(0);
  });
});

describe('can use the setCell utility function', ()=>{
  const game = new GameOfLife(5,5);
  it('can set a value in a cell', ()=>{
    game.setCell(1, 0,0);
    expect(game.board[0][0]).to.be.equal(1);
  });
  it('can set more numbers',()=>{
    game.setCell(1, 3,4);
    expect(game.board[3][4]).to.be.equal(1);
  });
});

describe('can toggle the value of a cell', ()=>{
  const game = new GameOfLife(5,5);
  it('can set a value from dead to alive', ()=>{
    game.toggleCell(1,1);
    expect(game.board[1][1]).to.be.equal(1);
  });
  it('can set a vlaue from alive to dead', ()=>{
    game.setCell(1,2,2);
    game.toggleCell(2,2);
    expect(game.board[2][2]).to.be.equal(0);
  })
});

describe('it can return the total count of live nieghbors', ()=>{
  const game = new GameOfLife(5,5);
  it('can returns total value of nieghbors', ()=>{
    game.toggleCell(1,1);
    expect(game.livingNeighbors(0,0)).to.be.eql(1)
  });
});

describe('can call the next generation using tick', ()=>{
  const game = new GameOfLife(3,3);
  game.board[2][1]=1;
  game.board[1][1]=1;
  game.board[0][1]=1;

  it('has a functioning tick method', ()=>{
      game.tick();
      expect(game.board).to.be.eql([
        [0,0,0],
        [1,1,1],
        [0,0,0]
      ])
  });
  it('it ocilates appropriatly', ()=>{
    game.tick();
    expect(game.board).to.be.eql([
      [0,1,0],
      [0,1,0],
      [0,1,0]
    ])
  });
});
