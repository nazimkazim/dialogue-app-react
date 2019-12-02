import React, { Component } from "react";
import { Grid, List, Button, Modal } from "semantic-ui-react";
import MatchImageToWord from "../MatchImageToWord";
//import { getImage } from "./Image";

class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 608,
      height: 608,
      words: [],
      open: false
    };
    this.colorPickerRef = React.createRef();
    //this.addWord = this.addWord.bind(this);
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
    sword.src = require("./img/bomb.png");

    let dead = new Audio();
    let eat = new Audio();
    let up = new Audio();

    let right = new Audio();
    let left = new Audio();
    let down = new Audio();
    let bonus = new Audio();
    let levelWin = new Audio();
    let jacket_zipper = new Audio();

    dead.src = require("./audio/dead.mp3");
    eat.src = require("./audio/eat.mp3");
    up.src = require("./audio/up.mp3");
    right.src = require("./audio/right.mp3");
    bonus.src = require("./audio/bonus.wav");
    levelWin.src = require("./audio/level-win.wav");
    left.src = require("./audio/left.mp3");
    down.src = require("./audio/down.mp3");
    jacket_zipper.src = require("./audio/jacket_zipper.wav");

    const words = this.props.lines.map(word => {
      let arr = word.parts.map(w => {
        return w.word;
      });
      return arr;
    });

    // Array of all words
    let wordsArr = words[0];

    // First word in array splitted
    let word = wordsArr[0].split("");
    let snake = [];

    // Word that is reduced
    //let wordReduce = word;

    //let wordSecret = "";

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
    let inc = 0;

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

    const addWord = word => {
      this.setState({
        words: this.state.words.concat(word)
      });
    };

    const openButton = arg => {
      this.setState({
        open: arg
      });
    };

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
        inc++;
        //wordSecret += wordReduce[score - 1];
        bonus.play();
        oldPositions.unshift({ x: food.x, y: food.y });
        word.shift();
        console.log(word);

        // While wordsArr > 0
        // If wordsArr === 0 victory

        // if word.length === 0
        // remove one item from wordsArr
        if (word.length === 0) {
          //let splicedWord = wordsArr.splice(0, 1);
          //word = splicedWord.split("");
          //word = "read".split("");
          score += inc;

          // Removes  a word from arr and splits in characters
          let wordRemoved = wordsArr.splice(0, 1);
          addWord(wordRemoved);

          if (wordsArr.length > 0) {
            word = wordsArr[0].split("");
          } else {
            ctx.fillStyle = "white";
            ctx.font = "45px Changa one";
            ctx.fillText("Victory", 10 * box, 1.6 * box);
            word = "";
            openButton(true);
            clearInterval(game);

            levelWin.play();
          }

          console.log(word);

          oldPositions.length = 0;
          jacket_zipper.play();

          inc = 0;

          ctx.fillStyle = "red";
          ctx.font = "30px Arial";
          ctx.fillText(inc, 18 * box, 1.6 * box);

          //wordReduce = word;
          //console.log(wordReduce);
        }

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

      snake.unshift(newHead);

      ctx.fillStyle = "white";
      ctx.font = "45px Changa one";
      if (word.length > 0) {
        ctx.fillText(word.join(""), 2 * box, 1.6 * box);
      }
      ctx.fillText(score, 15 * box, 1.6 * box);

      ctx.fillStyle = "red";
      ctx.font = "30px Arial";
      ctx.fillText(inc, 18 * box, 1.6 * box);
    }

    // call draw function every 100 ms

    let game = setInterval(draw, 200);
  }
  render() {
    console.table(this.state.words);
    const listWords = this.state.words.map((w, i) => (
      <List.Item key={i} style={{ textDecoration: "line-through" }}>
        <List.Content>
          <List.Header>{w}</List.Header>
        </List.Content>
      </List.Item>
    ));
    return (
      <Grid>
        <Grid.Column width={15}>
          <canvas
            height={this.state.height}
            width={this.state.width}
            ref={this.colorPickerRef}
          ></canvas>
        </Grid.Column>
        <Grid.Column width={1} style={{ width: "200px" }}>
          <List>{this.state.words && listWords}</List>
          {this.state.open && (
            <Modal trigger={<Button>Show Modal</Button>} centered={false}>
              <Modal.Header>Select a Photo</Modal.Header>
              <Modal.Content>
                <MatchImageToWord lines={this.props.lines} />
              </Modal.Content>
            </Modal>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Snake;
