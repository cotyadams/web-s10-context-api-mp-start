// Create your context here
import React, { createContext } from "react"
let id = 1
const getNextId = () => id++
const initialState = {
    getNextId: getNextId(),
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
}


export const quotesContext = createContext();

export const QuotesProvider = (props) => {
    return (
        <quotesContext.Provider value={initialState}>
            {props.children}
        </quotesContext.Provider>
    )
}