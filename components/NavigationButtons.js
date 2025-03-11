import React, {memo} from "react";
import { TouchableOpacity } from "react-native";

const NavigationButtons = memo(({ onTap, style, children, ...rest }) => {
    return (
        // when button is pressed onTap executes
        // {children} rendrs anything inside the button
        // ...rest spreads any additional props
        <TouchableOpacity onPress={onTap} {...rest} style={style}> 
            {children}
        </TouchableOpacity>
    );
});

export default NavigationButtons;