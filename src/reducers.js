const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateApples = () => [...Array(10)].map(() => [getRandomInt(1, 49), getRandomInt(1, 49)]);

const initialState = {
  snake: [[0, 25], [-1, 25], [-2, 25], [-3, 25], [-4, 25], [-5, 25], [-6, 25], [-7, 25], [-8, 25], [-9, 25]],
  snakeDirection: 'EAST',
  apples: generateApples()
}
const directions = {
  'NORTH': [0, -1],
  'SOUTH': [0, 1],
  'EAST': [1, 0],
  'WEST': [-1, 0]

}

const opposites = {
  'NORTH': 'SOUTH',
  'SOUTH': 'NORTH',
  'EAST': 'WEST',
  'WEST': 'EAST'
}

const snakeDirection = (state, direction) => {
  if (opposites[state] != direction) return direction;
  return state;
}

const tick = (state, direction) => {
  const [xDirection, yDirection] = directions[direction];
  const newHead = [state[0][0] + xDirection, state[0][1] + yDirection];
  const copy = state.slice(0, state.length - 1).map(([x, y]) => [x, y]);

  return [newHead, ...copy]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TICK': return Object.assign({}, state, {snake: tick(state.snake, state.snakeDirection)});
    case 'CHANGE_DIRECTION': return Object.assign({}, state, {snakeDirection: snakeDirection(state.snakeDirection, action.direction)})
    default: return state;
  }
}