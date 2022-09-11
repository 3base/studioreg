export const Animation = () => {
  const numberOfBalls = 40;

  const createCanvas = (id, elementSelector) => {
    const fragment = document.createDocumentFragment()
    const canvasElement = fragment.appendChild(document.createElement('canvas'))
    canvasElement.classList.add('home-page-canvas')
    canvasElement.id = id
    const canvasObject = canvasElement.getContext("2d");
    const parentElement = document.querySelector(elementSelector) ?? document.body
    parentElement.appendChild(fragment)
    return [canvasObject, canvasElement]
  }

  const [canvasObject, canvas] = createCanvas('canvas', '#app')

  const initCanvasSize = (canvasElement) => () => {
    const { innerWidth, innerHeight } = window;
    canvasElement.height = innerHeight;
    canvasElement.width = innerWidth;
    return canvasElement;
  }

  const setCanvasSize = initCanvasSize(canvas);
  setCanvasSize();

  const handleWindowResize = () => {
    setCanvasSize();
  }

  window.addEventListener('resize', handleWindowResize)

  class Ball {
    constructor(pos) {
      this.pos = pos;
      this.radius = Math.floor(Math.random() * 25);
      // this.color = randomColor();
      this.color = '#FFF'
      this.dx = Math.floor(Math.random() * 5 + 1);
      this.dy = -Math.floor(Math.random() * 5 + 1);
    }

    drawBall() {
      canvasObject.beginPath();
      canvasObject.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
      canvasObject.fillStyle = this.color;
      canvasObject.fill();
      canvasObject.closePath();
    }

    updateBall() {
      if (
        this.pos.x + this.dx > canvas.width - this.radius ||
        this.pos.x + this.dx < this.radius
      ) {
        this.dx = -this.dx;
      }
      if (
        this.pos.y + this.dy > canvas.height - this.radius ||
        this.pos.y + this.dy < this.radius
      ) {
        this.dy = -this.dy;
      }
      this.pos.x += this.dx;
      this.pos.y += this.dy;
      canvasObject.beginPath();
      canvasObject.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
      canvasObject.fillStyle = this.color;
      canvasObject.fill();
    }
  }

  function randomPos() {
    return {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
    };
  }

  const balls = Array(numberOfBalls)
    .fill(null)
    .map(() => {
      const newBall = new Ball(randomPos())
      newBall.drawBall()
      return newBall
  })

  const animate = () => {
    canvasObject.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
      ball.updateBall()
    });

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}