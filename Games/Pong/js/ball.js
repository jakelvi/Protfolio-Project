const initiatlVelocity = .025
const velocityIncrease = .00001

export default class ball {
    constructor(ballElm) {
        this.ballElm = ballElm
        this.reset();
    }


get x(){
    return parseFloat(getComputedStyle(this.ballElm).getPropertyValue("--x"))
    }
    
get y(){
    return parseFloat(getComputedStyle(this.ballElm).getPropertyValue("--y"))
}

set x(value){
    this.ballElm.style.setProperty("--x", value);
    }
    
set y(value){
    this.ballElm.style.setProperty("--y", value);
    }

  rect() {
    return this.ballElm.getBoundingClientRect()
    };
    
    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 };
        while (Math.abs(this.direction. x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const heading = randomNumBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        // console.log(this.direction);
        this.velocity = initiatlVelocity
    }

update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += velocityIncrease * delta
    const rect = this.rect()
    

    if(rect.bottom >= window.innerHeight || rect.top <= 0) {
    this.direction.y *= -1
    }
    if(paddleRects.some(r => isCollision(r, rect))) {
    this.direction.x *= -1
    }
    };
};

const randomNumBetween = (min, max) => {
    return Math.random() * (max-min) + min
}

const isCollision = (rect1, rect2) => {
    return(
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}