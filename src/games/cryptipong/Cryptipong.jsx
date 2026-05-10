import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

import '../a11y/index.scss';
import './styles/index.scss';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

export default function Cryptipong() {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 450,
      parent: gameRef.current,
      backgroundColor: '#0a0f14',
      input: {
        mouse: {
          preventDefaultWheel: false,
        },
      },
      scene: {
        preload() {
          this.load.image(
            'bg', '/games/cryptipong/bg/cryptipong-bg.avif'
          );
          this.load.audio(
            'paddle-bounce', '/games/cryptipong/sounds/paddle-bounce.wav'
          );
          this.load.audio(
            'surface-bounce', '/games/cryptipong/sounds/surface-bounce.wav'
          );
          this.load.audio(
            'score', '/games/cryptipong/sounds/score.wav'
          );
          this.load.audio(
            'win', '/games/cryptipong/sounds/win.wav'
          );
        },
        create() {

          this.add.image(400, 225, 'bg');

          this.randomYSpeed = () => {
            return Math.floor(Math.random() * 601) - 300;
          }

          this.resetBall = (ball) => {
            ball.x = 400;
            ball.y = 225;
          } 

          this.winState = () => {
            this.ballActive = false;
            this.roundOver = true;
            this.gameOver = true;
          }

          // Create left and right paddles
          this.leftPaddle = this.add.rectangle(50, 225, 20, 100, 0xffffff);
          this.rightPaddle = this.add.rectangle(750, 225, 20, 100, 0xffffff);

          // Set speed of the paddles
          this.paddleSpeed = 350

          // Create ball
          this.ball = this.add.circle(400, 225, 10, 0xffffff);

          // Set ball speed for X and Y movement
          this.ballSpeedX = Math.random() < 0.5 ? 500 : -500;
          this.ballSpeedY = this.randomYSpeed();

          this.ballSpeedYMultiplier= 5;

          // Create custom key inputs
          this.keys1 = this.input.keyboard.addKeys({
            up: 'w',
            down: 's',
          });

          // Create built in key inputs
          this.keys2 = this.input.keyboard.createCursorKeys();

          // Main state
          this.ballActive = false;
          this.roundOver = false;
          this.gameOver = false;
          this.gameStarted = false;

          this.playerOneScore = 0;
          this.playerTwoScore = 0;

          this.winningScore = 10;

          // Create the start button to begin playing
          this.startButton = this.add.text(400, 300, 'Start Game', {
            fontSize: '50px',
            color: '#ffffff',
          })
          .setOrigin(0.5)
          .setInteractive();

          this.startButton.on('pointerdown', () => {
            this.ballActive = true;
            this.gameStarted = true;
            this.startButton.setVisible(false).removeInteractive();
          });

          this.replayButton = this.add.text(400, 300, 'Replay', {
            fontSize: '50px',
            color: '#ffffff',
          })
          .setOrigin(0.5)
          .setVisible(false)
          .removeInteractive();

          this.replayButton.on('pointerdown', () => {
            this.ballActive = true
            this.roundOver = false;
            this.gameOver = false;
            this.gameStarted = true;
            this.replayButton.setVisible(false).removeInteractive();
            this.playerOneScore = 0;
            this.playerTwoScore = 0;
            this.playerOneScoreText.setText(this.playerOneScore);
            this.playerTwoScoreText.setText(this.playerTwoScore);
            this.playerOneWinsText.setVisible(false);
            this.playerTwoWinsText.setVisible(false);
            this.resetBall(this.ball);
            this.ballSpeedX = Math.random() < 0.5 ? 500 : -500;
            this.ballSpeedY = this.randomYSpeed();
            this.leftPaddle.y = 225;
            this.rightPaddle.y = 225;
          });

          // Texts dealing with player one and player two
          this.playerOneScoreText = this.add.text(300, 40, '0', {
            fontSize: '32px',
            color: '#ffffff',
          });

          this.playerTwoScoreText = this.add.text(500, 40, '0', {
            fontSize: '32px',
            color: '#ffffff',
          });

          this.playerTwoWinsText = this.add.text(400, 225, 'Player 2  wins!', {
              fontSize: '60px',
              color: '#ffffff',
            }).setOrigin(0.5);

          this.playerOneWinsText = this.add.text(400, 225, 'Player 1  wins!', {
              fontSize: '60px',
              color: '#ffffff',
            }).setOrigin(0.5);

          this.playerTwoWinsText.setVisible(false);
          this.playerOneWinsText.setVisible(false);
        },

        update(time, delta) { 

          if (!this.gameOver) {
            if (this.keys1.up.isDown) {
              this.leftPaddle.y -= this.paddleSpeed * (delta / 1000);
            }

            if (this.keys1.down.isDown) {
              this.leftPaddle.y += this.paddleSpeed * (delta / 1000);
            }

            if (this.keys2.up.isDown) {
              this.rightPaddle.y -= this.paddleSpeed * (delta / 1000);
            }

            if (this.keys2.down.isDown) {
              this.rightPaddle.y += this.paddleSpeed * (delta / 1000);
            }
          }

          // Keep the paddles from leaving the play area
          if (this.leftPaddle.y < 50) {
            this.leftPaddle.y = 50;
          }

          if (this.leftPaddle.y > 400) {
            this.leftPaddle.y = 400;
          }

          if (this.rightPaddle.y < 50) {
            this.rightPaddle.y = 50;
          }

          if (this.rightPaddle.y > 400) {
            this.rightPaddle.y = 400;
          }

          if (this.ballActive) {
            this.ball.x += this.ballSpeedX * (delta / 1000);
            this.ball.y += this.ballSpeedY * (delta / 1000);
          }

          if (this.ball.x <= -20 && this.ballActive && !this.gameOver) {
            this.sound.play('score');
            this.playerTwoScore ++;
            this.playerTwoScoreText.setText(this.playerTwoScore);
            this.ballActive = false;
            this.roundOver = true;

            if (this.playerTwoScore >= this.winningScore) {
              this.sound.play('win');
              this.winState();
              this.playerTwoWinsText.setVisible(true);
              this.replayButton.setVisible(true).setInteractive();
              return;
            }
           
            setTimeout(() => {
              this.resetBall(this.ball);
              this.ballSpeedX = -Math.abs(this.ballSpeedX);
              this.ballSpeedY = this.randomYSpeed();
              this.ballActive = true;
              this.roundOver = false;
            }, 2000);
          }

          if (this.ball.x >= 820 && this.ballActive && !this.gameOver) {
            this.sound.play('score');
            this.playerOneScore ++;
            this.playerOneScoreText.setText(this.playerOneScore);
            this.ballActive = false;
            this.roundOver = true;

            if (this.playerOneScore >= this.winningScore) {
              this.sound.play('win');
              this.winState();
              this.playerOneWinsText.setVisible(true);
              this.replayButton.setVisible(true).setInteractive();
              return;
            }

            setTimeout(() => {
              this.resetBall(this.ball);
              this.ballSpeedX = Math.abs(this.ballSpeedX);
              this.ballSpeedY = this.randomYSpeed();
              this.ballActive = true;
              this.roundOver = false;
            }, 2000);
          }

          if (this.ball.y <= 10) {
            this.sound.play('surface-bounce');
            this.ball.y = 10;
            this.ballSpeedY = Math.abs(this.ballSpeedY);
          }

          if (this.ball.y >= 440) {
            this.sound.play('surface-bounce');
            this.ball.y = 440;
            this.ballSpeedY = -Math.abs(this.ballSpeedY);
          }

          const ballBounds = this.ball.getBounds();
          const leftPaddleBounds = this.leftPaddle.getBounds();
          const rightPaddleBounds = this.rightPaddle.getBounds();

          if (
            Phaser.Geom.Intersects.RectangleToRectangle(ballBounds, leftPaddleBounds)
          ) {
            this.sound.play('paddle-bounce');
            this.ballSpeedX = Math.abs(this.ballSpeedX);
            const ballLoc = this.ball.y - this.leftPaddle.y;
            this.ballSpeedY = ballLoc * this.ballSpeedYMultiplier;
          }

          if (
            Phaser.Geom.Intersects.RectangleToRectangle(ballBounds, rightPaddleBounds)
          ) {
            this.sound.play('paddle-bounce');
            this.ballSpeedX = -Math.abs(this.ballSpeedX);
            const ballLoc = this.ball.y - this.rightPaddle.y;
            this.ballSpeedY = ballLoc * this.ballSpeedYMultiplier;
          }
        }
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return(

    <PageTemplate slug="cryptipong" title="Cryptipong" className="cryptipong">

      <Block title="How to Play">
        <p>
          It's classic pong! A nice relaxing game you can play with your friends overlooking a nice cozy cottage in Cryptid Woods. First to ten wins!
        </p>

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite">
          {}
        </div>
      </Block>

      <Block label="Cryptipong">
        <div className="cryptipong__game" ref={gameRef}>

        </div>
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}