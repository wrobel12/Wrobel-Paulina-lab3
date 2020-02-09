
class Hole  {
    constructor(x, y) {
      this.positionX = x
      this.positionY = y
      this.winHole = false
    }
}

let currentX;
let currentY;
let holes = [];

let spaceX;
let spaceY;

class Game {
    constructor(canvasId) {
        this.initializeCanvas(canvasId)
        this.setup = new Init()
        this.gameStarted = false
        this.startGameTrigger()


        window.addEventListener('deviceorientation', (e) => this.handleOrientation(e))
        

    }


    initializeCanvas(canvasId) {
        if (canvasId) {
          this.canvas = document.getElementById(canvasId)
          this.ctx = this.canvas.getContext('2d')
        } else {
          throw new Error('You have to provide Canvas ID')
        }
      }



      startGameTrigger() {
        
        this.setup.startMsg.addEventListener("click", (e) => this.startGame(e))
        
        
      }

      startGame() {
  
        this.setup.startMsg.style.opacity = 0;
        this.setup.instructions.style.opacity = 0;
        this.setup.failMsg.style.opacity = 0
        this.setup.winMsg.style.opacity = 0
        this.setup.timer.style.opacity = 1;

        

        this.drawBall()
        this.drawHoles()
        this.date = new Date().getTime();
        this.interval = setInterval((e) => this.myTimer(e) ,1000)

        this.gameStarted = true

        
      }

      restartGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.style.opacity = 1
        holes = []
        this.startGame()
      }

      drawBall() {
        this.setup.ball.style.opacity = 1
      }





      drawHoles() {
        let x
        let y

         for (let i = 0; i <= 5; i++) {

         x = Math.floor(Math.random() * (this.canvas.clientWidth - 25*2) + 25);
         y = Math.floor(Math.random() * ((this.canvas.clientHeight - 150)- 25*2) + 25);


         let hole = new Path2D();

          

         hole.moveTo(x, y);
         hole.arc(x, y, 20, 0, 2 * Math.PI);

         this.h = new Hole(x, y)
         holes.push(this.h)
 
         if (i == 5) {
          this.ctx.fillStyle = '#5f9042'
          this.h.winHole = true
         } else {
         
         this.ctx.fillStyle = 'black';
         }
         this.ctx.fill(hole);
    
      }
  
     
      }


      myTimer() {

        let newDate;

        if (this.gameStarted == false) {
          newDate = 0;
          
      } else {
        newDate = new Date().getTime() - this.date;
      }

      this.setup.timerValue.innerHTML = this.convertMS(newDate);

      }



     convertMS(ms) {
      let m, s;
      s = Math.floor(ms / 1000);
      m = Math.floor(s / 60);
      s = s % 60;
      m = m % 60;
  
      if (s < 10 ) {
          return "0" + m + ':' + "0" + s;
      }
  
      return "0" + m + ':' + s;
     }
      



     handleOrientation(e) {

      let maxX = this.canvas.clientHeight - this.setup.ball.clientHeight
      let maxY = this.canvas.clientWidth - this.setup.ball.clientWidth
      currentY = event.beta;
      currentX = event.gamma; 
   
    
     
      let top = currentY
      let left = currentX

      if (top <= 10) {
        this.setup.ball.style.top = 0 + "px"
      } else if (top >= 47) {
        this.setup.ball.style.top = 580 + "px"

      } else { 
        this.setup.ball.style.top  = maxY*currentY/25 + "px";
        
      }

      this.spaceY = window.scrollY + this.setup.ball.getBoundingClientRect().top
        

      if (left <= 0) {
        this.setup.ball.style.left = 0 + "px"

      } else if (left >= 13) {
        this.setup.ball.style.left = 310 + "px"

      } else {
      
        this.setup.ball.style.left = maxX*currentX/25 + "px";

        
      }

      this.spaceX = window.scrollX + this.setup.ball.getBoundingClientRect().left
      

      this.checkGameStatus()
   

    }
  

    checkGameStatus() {

      let distance = 0
      let minimumDistance = 35

        holes.forEach(elem => {

          let y = Math.abs((elem.positionY + 20) - (this.spaceY + 25))
          let x = Math.abs((elem.positionX + 20) - (this.spaceX + 25))

        distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

        console.log(this.spaceX)

        if (distance < minimumDistance) {

          if (elem.winHole == false) {
            this.gameLost()
          } else {
            this.gameWin()
          }
        }


     
         
        });

        
    }


    stopInterval() {
      clearInterval(this.interval)
    }

    gameLost() {
      this.canvas.style.opacity = 0.3
      this.setup.failMsg.style.opacity = 1
      this.stopInterval()
      this.gameStarted = false
      this.setup.failMsg.addEventListener("click", (e) => this.restartGame(e))

    }

    gameWin() {
      this.canvas.style.opacity = 0.3
      this.setup.winMsg.style.opacity = 1
      this.stopInterval()
      this.gameStarted = false
      this.setup.winMsg.addEventListener("click", (e) => this.restartGame(e))
    }
     

}