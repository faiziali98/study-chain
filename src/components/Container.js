import React from "react";

const Container = ({ children }) => {
    const styles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'docs-Roboto, Helvetica, Arial, sans-serif',
        minHeight: '100vh',
        color: 'white',
        backgroundColor: "#282c34"
    };

    return <div style={styles}>{children}</div>;
  };

export default Container;
