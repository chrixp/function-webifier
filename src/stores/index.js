import React from 'react'
import FunctionStore from './Function'

const stores = {
    FunctionStore
}

export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
    return (
        <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
    )
}

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);
 
/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
  return <Component {...props} store={useStore()} />;
};
