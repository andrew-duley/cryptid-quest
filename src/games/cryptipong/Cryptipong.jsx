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

          this.playerOneScore = 0;
          this.playerTwoScore = 0;

          this.ballActive = true;
          this.roundOver = false;

          this.playerOneScoreText = this.add.text(300, 40, '0', {
            fontSize: '32px',
            color: '#ffffff',
          });

          this.playerTwoScoreText = this.add.text(500, 40, '0', {
            fontSize: '32px',
            color: '#ffffff',
          });
        },

        update(time, delta) { 

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

          if (this.ball.x <= -20 && this.ballActive) {
            this.playerTwoScore ++;
            this.playerTwoScoreText.setText(this.playerTwoScore);
            this.ballActive = false;
            this.roundOver = true;
           
            setTimeout(() => {
              this.resetBall(this.ball);
              this.ballSpeedX = -Math.abs(this.ballSpeedX);
              this.ballSpeedY = this.randomYSpeed();
              this.ballActive = true;
              this.roundOver = false;
            }, 2000);
          }

          if (this.ball.x >= 820 && this.ballActive) {
            this.playerOneScore ++;
            this.playerOneScoreText.setText(this.playerOneScore);
            this.ballActive = false;
            this.roundOver = true;

            setTimeout(() => {
              this.resetBall(this.ball);
              this.ballSpeedX = Math.abs(this.ballSpeedX);
              this.ballSpeedY = this.randomYSpeed();
              this.ballActive = true;
              this.roundOver = false;
            }, 2000);
          }

          if (this.ball.y <= 10) {
            this.ball.y = 10;
            this.ballSpeedY = Math.abs(this.ballSpeedY);
          }

          if (this.ball.y >= 440) {
            this.ball.y = 440;
            this.ballSpeedY = -Math.abs(this.ballSpeedY);
          }

          const ballBounds = this.ball.getBounds();
          const leftPaddleBounds = this.leftPaddle.getBounds();
          const rightPaddleBounds = this.rightPaddle.getBounds();

          if (
            Phaser.Geom.Intersects.RectangleToRectangle(ballBounds, leftPaddleBounds)
          ) {
            this.ballSpeedX = Math.abs(this.ballSpeedX);
            const ballLoc = this.ball.y - this.leftPaddle.y;
            this.ballSpeedY = ballLoc * this.ballSpeedYMultiplier;
          }

          if (
            Phaser.Geom.Intersects.RectangleToRectangle(ballBounds, rightPaddleBounds)
          ) {
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

      <Block label="Cryptipong">
        <div className="cryptipong__game" ref={gameRef}>

        </div>
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}