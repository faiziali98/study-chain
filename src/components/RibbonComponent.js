import React from "react";
import { RibbonContainer, Ribbon } from "react-ribbons";

const RibbonComponent = ({ children, isDemo }) => {
    return (
        <RibbonContainer >
            {isDemo && <Ribbon
                side="right"
                type="corner"
                size="large"
                backgroundColor="#cc0000"
                color="#ccffff"
                fontFamily="sans"
                withStripes={true}
            >
                Demo
            </Ribbon>}
            {isDemo && <Ribbon
                side="left"
                type="corner"
                size="large"
                backgroundColor="#cc0000"
                color="#ccffff"
                fontFamily="sans"
                withStripes={true}
            >
                Only
            </Ribbon>}
            {children}
        </RibbonContainer>
    )
}

export default RibbonComponent;