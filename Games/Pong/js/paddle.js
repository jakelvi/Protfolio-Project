const speed = 0.02

export default class Paddle {
    constructor(paddleElm) {
        this.paddleElm = paddleElm
        this.reset();
    }
    get position() {
        return parseFloat(getComputedStyle(this.paddleElm).getPropertyValue("--position"))
    }
    set position(value) {
        this.paddleElm.style.setProperty("--position", value);

    }
    
  rect() {
    return this.paddleElm.getBoundingClientRect()
    };

    reset() {
        this.position = 50;
    }
    // update(delta, ballHeight) {
    //     this.position = ballHeight //if this function will come forth, then you couldnt win against the computer
    // }

    update(delta, ballHeight) {
        this.position += speed * delta * (ballHeight - this.position)
    }
}
