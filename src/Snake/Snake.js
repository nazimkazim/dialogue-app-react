import React, { Component } from "react";
//import { getImage } from "./Image";

class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 608,
      height: 608,
      words: []
    };
    this.colorPickerRef = React.createRef();
  }
  componentDidMount() {
    this.context = this.colorPickerRef.current.getContext("2d");

    this.newGame(this.context);
  }

  newGame(ctx) {
    const box = 32;
    const ground = new Image();
    ground.src = require("./img/ground.png");
    const sword = new Image();
    sword.src = require("./img/sword.png");

    let dead = new Audio();
    let eat = new Audio();
    let up = new Audio();

    let right = new Audio();
    let left = new Audio();
    let down = new Audio();
    let bonus = new Audio();
    let levelWin = new Audio();

    dead.src = require("./audio/dead.mp3");
    eat.src = require("./audio/eat.mp3");
    up.src = require("./audio/up.mp3");
    right.src = require("./audio/right.mp3");
    bonus.src = require("./audio/bonus.wav");
    levelWin.src = require("./audio/level-win.wav");
    left.src = require("./audio/left.mp3");
    down.src = require("./audio/down.mp3");

    const words = this.props.lines.map(word => {
      let arr = word.parts.map(w => {
        return w.word;
      });

      return arr;
    });

    let wordInput = words[0][0];
    let snake = [];
    let word = wordInput.split("");
    let wordReduce = wordInput;
    let wordSecret = "";
    let oldPositions = [];

    snake[0] = {
      x: 9 * box,
      y: 10 * box
    };

    // create the food

    let food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };

    // create the score var

    let score = 0;

    //control the snake

    let d;

    document.addEventListener("keydown", direction);

    function direction(event) {
      let key = event.keyCode;
      if (key === 37 && d !== "RIGHT") {
        left.play();
        d = "LEFT";
      } else if (key === 38 && d !== "DOWN") {
        d = "UP";
        up.play();
      } else if (key === 39 && d !== "LEFT") {
        d = "RIGHT";
        right.play();
      } else if (key === 40 && d !== "UP") {
        d = "DOWN";
        down.play();
      }
    }

    // cheack collision function
    function collision(head, array) {
      if (array.length <= 1) {
        return false;
      }

      if (array[0].x === head.x && array[0].y === head.y) {
        return false;
      }

      for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
          return true;
        }
      }
      return false;
    }

    // draw everything to the canvas

    function draw() {
      ctx.drawImage(ground, 0, 0);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }

      ctx.fillRect(food.x, food.y, box, box);
      ctx.fillStyle = "black";
      //ctx.drawImage(sword, food.x, food.y);

      ctx.font = "20pt sans-serif";
      ctx.fillText(word[0], food.x + box / 2, food.y + box / 2);

      oldPositions.forEach(pos => {
        ctx.drawImage(sword, pos.x, pos.y);
      });

      // old head position
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      // which direction
      if (d === "LEFT") snakeX -= box;
      if (d === "UP") snakeY -= box;
      if (d === "RIGHT") snakeX += box;
      if (d === "DOWN") snakeY += box;

      // if the snake eats the food
      if (snakeX === food.x && snakeY === food.y) {
        score++;
        wordSecret += wordReduce[score - 1];
        bonus.play();
        oldPositions.unshift({ x: food.x, y: food.y });
        word.shift();

        food = {
          x: Math.floor(Math.random() * 17 + 1) * box,
          y: Math.floor(Math.random() * 15 + 3) * box
        };

        // we don't remove the tail
      } else {
        // remove the tail
        snake.pop();
      }

      // add new Head

      let newHead = {
        x: snakeX,
        y: snakeY
      };

      // game over

      if (
        snakeX < box ||
        snakeX > 17 * box ||
        snakeY < 3 * box ||
        snakeY > 17 * box ||
        collision(newHead, snake) ||
        collision(newHead, oldPositions)
      ) {
        clearInterval(game);
        dead.play();
      }

      if (wordReduce.length === score) {
        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText("Victory", 10 * box, 1.6 * box);
        //clearInterval(game);
        levelWin.play();
      }

      snake.unshift(newHead);

      ctx.fillStyle = "white";
      ctx.font = "45px Changa one";
      ctx.fillText(wordSecret, 2 * box, 1.6 * box);
      ctx.fillText(score, 15 * box, 1.6 * box);
    }

    // call draw function every 100 ms

    let game = setInterval(draw, 200);
  }
  render() {
    console.table(this.state.words);
    return (
      <div>
        <canvas
          height={this.state.height}
          width={this.state.width}
          ref={this.colorPickerRef}
        ></canvas>
      </div>
    );
  }
}

export default Snake;
