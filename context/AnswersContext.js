import React, { createContext, useContext, useState } from 'react';

const AnswersContext = createContext();

export const AnswersProvider = ({ children }) => {
    const [answers, setAnswers] = useState({});
    return (
        <AnswersContext.Provider value={[answers, setAnswers]}>
            {console.log("All answers: ", answers)}
            {children}
        </AnswersContext.Provider>
    );
};

export const useAnswers = () => {
    const context = useContext(AnswersContext);
    if (!context) {
        throw new Error('useAnswers must be used within an AnswersProvider');
    }
    return context;
};
