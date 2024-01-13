import React, { createContext } from "react";

const initialState = {
  authorName: '',
  quoteText: '',
}

export const QuoteFormContext = createContext();

export const QuoteFormProvider = (props) => {
    return (
        <QuoteFormContext.Provider value={initialState}>
            {props.children}
        </QuoteFormContext.Provider>
    )
}