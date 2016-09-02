const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateApples = () => [...Array(10)].map(() => [getRandomInt(1, 49), getRandomInt(1, 49)]);

const initialState = {
  snake: [[0, 25], [-1, 25], [-2, 25], [-3, 25], [-4, 25], [-5, 25], [-6, 25], [-7, 25], [-8, 25], [-9, 25]],
  snakeDirection: 'EAST',
  apples: generateApples(),
  grow: 0
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

const tick = (state) => {
  const newHead = nextHead(state.snake[0], state.snakeDirection);
  const {apples, eatenCount} = eatApples(state.apples, newHead)
  const shouldGrow = state.grow > 0 || eatenCount > 0;

  const body = (shouldGrow ? state.snake : state.snake.slice(0, state.snake.length - 1))
    .map(([x, y]) => [x, y]);

  const grow = shouldGrow ? state.grow + eatenCount * 3 - 1 : 0;

  return Object.assign({}, state, {apples, grow, snake: [newHead, ...body]});
}

const nextHead = ([x, y], direction) => {
  const [xDirection, yDirection] = directions[direction];
  return [x + xDirection, y + yDirection];
}

const eatApples = (apples, [x, y]) => {
  const newApples = apples.filter(([aX, aY]) => x !== aX || y !== aY).map(([x, y]) => [x, y]);
  return {
    apples: newApples.length > 0 ? newApples : generateApples(),
    eatenCount: apples.length - newApples.length
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TICK': return Object.assign({}, state, tick(state));
    case 'CHANGE_DIRECTION': return Object.assign({}, state, {
      snakeDirection: snakeDirection(state.snakeDirection, action.direction)})
    default: return state;
  }
}