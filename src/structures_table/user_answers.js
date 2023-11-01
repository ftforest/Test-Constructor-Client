import {createContext, useContext} from "react";

export const UserAnswerContext = createContext()
export const useUserAnswers = () => useContext(UserAnswerContext)

const Button = ({ as, children, ...props }) => {
    const Component = as || "button";

    return <Component {...props}>{children}</Component>;
};

export default Button
export const structure = {
    'id': {
        'value':'',
        'type':'text',
    },
    'user_id': {
        'value':'addId',
        'type':'text',
    },
    'test_id': {
        'value':'addId',
        'type':'text',
    },

    'right': {
        'value':'',
        'type':'number',
    },
    'wrong': {
        'value':'',
        'type':'number',
    },
    'created_at': {
        'value':'',
        'type':'date',
    }
}