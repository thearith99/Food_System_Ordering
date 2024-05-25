import React, { useContext, useState } from 'react';

// Create the context with an initial value and the TypeScript interface
const homeContext = React.createContext({
    cardlist: []
});
