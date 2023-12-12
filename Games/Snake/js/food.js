import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js' // Updated import

const getRandomFoodPosition = () => {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition() // Updated function name
  }
  return newFoodPosition
}

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1

export const update = () => {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
  }
}

export const draw = (board) => {
  const foodElement = document.createElement("div")
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add("food")
  board.appendChild(foodElement)
}


