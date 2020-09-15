const initialState = {
  citiesList: [],
  city:[] ,
}
const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETCITIES":
      return {...state, citiesList: action.payload}
      
    case "GETCITY":
      return {...state, city: action.payload}
      
    default:
      return state
  }
}
export default citiesReducer
