import React from 'react';
import useGet from './hooks/useGet';
import axios from 'axios';

const AppContext = React.createContext({
    states: []
});

function AppContextProvider({ children }) {

    // Get some states from the backend.
    const {
        data: states,
        isLoading: statesLoading,
        update: updateState,
        create: createState
    } = useGet('/api/states', []);

    // The context value that will be supplied to any descendants of this component.
    const context = {
        states,
        statesLoading,
        updateState,
        createState

    };

    console.log(states);

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};