import { Map, List, Range, fromJS } from 'immutable';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const generateApples = () => Range(1, 10).map(_ => List.of(getRandomInt(1, 49), getRandomInt(1, 49))).toList();

const initialState = Map({
  snake: Range(0, -9, 1).map(i => List.of(i, 25)).toList(),
  direction: 'EAST',
  apples: generateApples(),
  grow: 0
});

const getNewHead = ([x, y], direction) => {
  switch (direction) {
    case 'NORTH': return List.of(x, y - 1);
    case 'SOUTH': return List.of(x, y + 1);
    case 'EAST': return List.of(x + 1, y);
    case 'WEST': return List.of(x - 1, y);
  }
}

const getApples = (apples, head) => apples.every(a => a === head) ? generateApples() : apples.filter(a => !a.equals(head));

const getOpposite = (direction) =>{
  switch (direction) {
    case 'NORTH': return 'SOUTH';
    case 'SOUTH': return 'NORTH';
    case 'EAST' : return 'WEST';
    case 'WEST' : return 'EAST';
  }
};

const getDirection = (state, direction) => (getOpposite(state) != direction) ? direction : state;

const tick = (state) => {
  const newHead = getNewHead(state.get('snake').first(), state.get('direction'));

  const apples = getApples(state.get('apples'), newHead);

  const eatenCount = state.get('apples').size - apples.size;

  const shouldGrow = state.get('grow') > 0 || eatenCount > 0;

  const body = (shouldGrow ? state.get('snake') : state.get('snake').pop());

  const grow = shouldGrow ? state.get('grow') + eatenCount * 3 - 1 : 0;

  return state.merge({apples, grow, snake: body.unshift(newHead)});
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TICK': return tick(state);
    case 'CHANGE_DIRECTION': return state.set('direction', getDirection(state.get('direction'), action.direction))
    default: return state;
  }
}