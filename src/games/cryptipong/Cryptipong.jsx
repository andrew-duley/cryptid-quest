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
        create() {
          this.leftPaddle = this.add.rectangle(50, 225, 20, 100, 0xffffff);
          this.rightPaddle = this.add.rectangle(750, 225, 20, 100, 0xffffff);
          this.ball = this.add.circle(400, 225, 10, 0xffffff);
          this.ballSpeedX = 400;
          this.ballSpeedY = 300;
          this.add.text(300, 220, 'Phaser works!', {
            fontSize: '32px',
            color: '#ffffff',
          });
        },
        update(time, delta) {
          this.ball.x += this.ballSpeedX * (delta / 1000);
          this.ball.y += this.ballSpeedY * (delta / 1000);

          if (this.ball.x <= 0) {
            this.ballSpeedX *= -1;
          }

          if (this.ball.x >= 800) {
            this.ballSpeedX *= -1;
          }

          if (this.ball.y <= 0) {
            this.ballSpeedY *= -1;
          }

          if (this.ball.y >= 450) {
            this.ballSpeedY *= -1;
          }

          const ballBounds = this.ball.getBounds();
          const leftPaddleBounds = this.leftPaddle.getBounds();
          const rightPaddleBounds = this.rightPaddle.getBounds();

          if (
            Phaser.Geom.Intersects.RectangleToRectangle(ballBounds, leftPaddleBounds)
          ) {
            this.ballSpeedX = Math.abs(this.ballSpeedX);
          }

          if (
            Phaser.Geom.Intersects.RectangleToRectangle(ballBounds, rightPaddleBounds)
          ) {
            this.ballSpeedX = Math.abs(this.ballSpeedX);
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