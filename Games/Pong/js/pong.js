//update each frame:

import Ball from "./ball.js";
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("playerPaddle"));
const computerPaddle = new Paddle (document.getElementById("computerPaddle"));
const playerScore = document.getElementById("playerScore")
const computerScore = document.getElementById("computerScore")
let lastTime;


const update = (time) => {
    // console.log(time);
    if (lastTime != null) {
        const delta = time - lastTime
            const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
        // console.log(delta)
        ball.update(delta,[playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)

        if (lose())
            handleLose()
            
        
    }
    lastTime = time
    window.requestAnimationFrame(update);
};
const lose = () => {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0
}

const handleLose = () => {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    }
    else {
        computerScore.textContent = parseInt(computerScore.textContent) + 1
    }
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
});

window.requestAnimationFrame(update); //infinte loop, for each change on the screen we will see it