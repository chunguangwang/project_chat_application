import React from 'react';
import PureCanvas from './PureCanvas';
import muzhuIcon from '../../icons/muzhu.jpg';
class CanvasComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        precision : 0.001,
        prevGuess : 0
      } 
      this.saveContext = this.saveContext.bind(this);
    }


    f = (x, M) => {
        return x - 0.64 * Math.sin(x) - M;
    }
    
    derivative = (x) => {
        return 1 - 0.64 * Math.cos(x);
    }
    
    newtonsMethod = (guess, M) => {
        if (guess === null || guess === undefined)
            guess = 0;
    
        if (Math.abs(this.state.prevGuess - guess) > this.state.precision) {
            this.state.prevGuess = guess;
            var approx = guess - (this.f(guess, M) / this.derivative(guess));
    
            console.log(guess);

            console.log('\n');
    
            return this.newtonsMethod(approx, M);
        } else {
            return guess;
        }
    }


  
    saveContext(ctx) {
      this.ctx = ctx;
      this.width = this.ctx.canvas.width;
      this.height = this.ctx.canvas.height;
    }
  
    componentDidUpdate() {
      const { angle } = this.props;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.ctx.fillStyle = '#4397AC';

      this.ctx.strokeStyle = '#4397AC';


      // var imageObj1 = new Image();
      // imageObj1.src = muzhuIcon;
      // this.ctx.drawImage(imageObj1, 0, 0);
      this.ctx.strokeRect(170, 100, 1, 1);

      const anomaly = this.newtonsMethod(angle/20, angle/20);
      const x = 170 + 100 * Math.cos(anomaly) - 100 * 0.64;
      const y = 100 - 80 * Math.sin(anomaly);
      this.ctx.strokeRect(x, y, 3, 3);

      this.ctx.stroke();

      this.ctx.beginPath();

      this.ctx.strokeStyle = "#FF0000";
      this.ctx.lineWidth = 3;
      // this.ctx.strokeRect(this.width / 2 + 10 + 50 * Math.cos((angle * Math.PI) / 180), this.height / 2 + 75 + 50 * Math.sin((angle * Math.PI) / 180), 3, 3);
      this.ctx.ellipse(110, 100, 100, 80, 0, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
  
    render() {
      return <PureCanvas contextRef={this.saveContext} />;
    }
}
export default CanvasComponent;