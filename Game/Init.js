class Init {

    constructor() {
        this.startMsg = this.getStartPannel()
        this.instructions = this.getInstructions()
        this.ball = this.getBall()
        this.timer = this.getTimer()
        this.winMsg = this.getWinMsg()
        this.failMsg = this.getFailMsg()
        this.startGameTrigger = this.getStartGameTrigger()
        this.timerValue = this.getTimerValue()
    }


    getStartPannel() {
        const startPannel = document.getElementById("startPannel")
        return startPannel
    }
    getInstructions() {
        const instructions = document.getElementById("instructions")
        return instructions
    }
    getBall() {
        const ball = document.querySelector('.ball')
        return ball;
    }
    getTimer() {
        const timer = document.getElementById("time")
        return timer
    }
    getWinMsg() {
        const winMsg = document.getElementById("winMsg")
        return winMsg;
    }
    getFailMsg() {
        const failMsg = document.getElementById("failMsg")
        return failMsg
    }
    getStartGameTrigger() {
        const startGameTrigger = document.getElementById("startGame")
        return startGameTrigger
    }

    getTimerValue() {
        const timerValue = document.getElementById("timeValue")
        return timerValue
    }
}


