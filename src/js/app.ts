import P5 from "p5";

import Playfield from "./playField";
import Pieces from "./pieces";
import Render from "./render";

import { cellSize, rowSize, borderSize } from "./config";

class Tetris {
  isStart: boolean;
  isPause: boolean;
  
  modal: HTMLElement;
  modalButton: HTMLElement;

  creativeLib;
  playfield: Playfield;
  render: Render;

  currentSecond: number;
  prev: number = 0;


  constructor(creativeLib) {
    this.isStart = false;
    this.isPause = false;

    this.modal = document.querySelector(".modal");
    this.modalButton = document.querySelector(".modal h2");

    this.creativeLib = creativeLib
  }

  get isOver() {
    return this.playfield.isOver
  }

  openModal(title, action) {
    this.modalButton.innerText = title;
    this.modal.style.display = "flex";

    this.modalButton.addEventListener("click", () => {
      action();
      
      this.modal.style.display = "none";
    });
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  start() {
    this.isPause = false
    this.isStart = true

    const pieces = new Pieces();

    this.playfield = new Playfield(pieces);
    this.render = new Render(this.creativeLib, this.playfield, pieces);
  }

  restart() {
    this.openModal('RESTART??', () => {

      const 
      pieces = new Pieces();
      this.playfield = new Playfield(pieces);
      this.render = new Render(this.creativeLib, this.playfield, pieces);
      
      this.playfield.restart()
    })
  }

  draw() {
    this.creativeLib.background(250);

    this.playfield.makeGhost();

    this.render.renderPlayfield();

    this.render.renderPiece(this.playfield.pieces.ghostPiece);
    this.render.renderPiece(this.playfield.pieces.currentPiece);
   
    this.render.renderField(this.playfield.nextField)
    this.render.renderField(this.playfield.holdField)

    console.log(this.playfield.holdField.piece)


    this.currentSecond = this.creativeLib.millis();

    if (this.currentSecond - this.prev >= 500 && !this.isPause) {
      this.playfield.moveCurrentPieceDown();

      this.prev = this.currentSecond;
    }
  }

  registerListeners() {
    document.addEventListener('keydown', (e) => {    
      switch(e.code) {
        case 'ArrowRight': 
          if (this.isPause) {
            return;
          }

          this.playfield.moveCurrentPieceRight();
          break;
        case 'ArrowLeft': 
          if (this.isPause) {
            return;
          }

          this.playfield.moveCurrentPieceLeft();
          break;
        case 'ArrowDown': 
          if (this.isPause) {
            return;
          }

          this.playfield.moveCurrentPieceDown();
          break;
        case 'ArrowUp': 
          if (this.isPause) {
            return;
          }

          this.playfield.rotateCurrentPiece();
          break;
        case 'ShiftLeft': 
          if (this.isPause) {
            return;
          }

          this.playfield.holdTheCurrentPiece();
          break;
        case 'Space':
          if (this.isPause) {
            return;
          }

          this.playfield.forcedDrop();
          break
        case 'KeyP':
          if(!this.start) {
            return 
          }

          if (this.isPause) {
            this.closeModal()
          }
    
          this.togglePause()
          
          if (this.isPause) {
            this.openModal('PAUSE!!', () => tetris.pause)
          }
      }
    })
  };

  private pause() {
    this.isPause = true
  }

  private togglePause() {
    this.isPause = !this.isPause
  }
}

let tetris: Tetris;

const sketch = (p5: P5) => {

  p5.setup = () => {
    let totalWidth = cellSize * 24 + borderSize * 2;
    let totalHeight = cellSize * rowSize + borderSize * 2 + 50;
    
    p5.createCanvas(totalWidth, totalHeight).parent("app");
    p5.frameRate(14);

    tetris = new Tetris(p5)

    tetris.openModal('START?!!', () => tetris.start())

    tetris.registerListeners()
  };

  p5.draw = () => {
    if (!tetris.isStart) {
      return;
    }

    tetris.draw()

    if (tetris.isOver) {
      tetris.restart()
    }
  };
};

new P5(sketch);
