import React, { useReducer, useContext} from 'react'
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'
import { quotesContext } from '../context/quotesContext';

const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY'
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'



const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_QUOTE:
      return { ...state, quotes: [...state.quotes, action.payload] }
    case DELETE_QUOTE:
      return { ...state, quotes: state.quotes.filter(qt => qt.id !== action.payload) }
    case EDIT_QUOTE_AUTHENTICITY:
      return {
        ...state,
        quotes: state.quotes.map(qt => {
          if (qt.id != action.payload) return qt
          return { ...qt, apocryphal: !qt.apocryphal }
        })
      }
    case SET_HIGHLIGHTED_QUOTE:
      return {
        ...state,
        highlightedQuote: state.highlightedQuote !== action.payload
          ? action.payload
          : null
      }
    case TOGGLE_VISIBILITY:
      return { ...state, displayAllQuotes: !state.displayAllQuotes }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, useContext(quotesContext))
  const createQuote = ({ authorName, quoteText }) => {
    const newQuote = { id: state.getNextId, authorName, quoteText, apocryphal: false }
    dispatch({ type: CREATE_QUOTE, payload: newQuote })
  }
  const deleteQuote = id => {
    dispatch({ type: DELETE_QUOTE, payload: id })
  }
  const editQuoteAuthenticity = id => {
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: id })
  }
  const setHighlightedQuote = id => {
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id })
  }
  const toggleVisibility = () => {
    dispatch({ type: TOGGLE_VISIBILITY })
  }
  return (
    <div id="mp">
      <h2>Module Project</h2>
      <quotesContext.Provider value={state}>
        <Quotes
          deleteQuote={deleteQuote}
          editQuoteAuthenticity={editQuoteAuthenticity}
          setHighlightedQuote={setHighlightedQuote}
          toggleVisibility={toggleVisibility}
          displayAllQuotes={state.displayAllQuotes}
          highlightedQuote={state.highlightedQuote}
          quotes={state.quotes}
        />
        <QuoteForm
          createQuote={createQuote}
        />
      </quotesContext.Provider>
    </div>
  )
}
