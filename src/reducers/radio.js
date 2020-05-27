const radio = (state = 0, action) => {
  switch (action.type) {
    case 'SET_RADIO':
      return action.id
    default:
      return state
  }
}

export default radio
