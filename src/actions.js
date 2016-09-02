export const tick = () => {
  return {
    type: 'TICK'
  }
}

export const changeDirection = direction => {
  return {
    type: 'CHANGE_DIRECTION',
    direction
  }
}