export const pluraliseThunk = thunk => ids => dispatch => {
  return Promise.all(
    ids.map(
      id => dispatch(thunk(id))
    )
  )
}