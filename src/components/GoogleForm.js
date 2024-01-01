import React, { useRef, useEffect } from 'react';

const GoogleForm = ({url}) => {
  const iframeRef = useRef();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === 'https://docs.google.com' && event.data === 'form-submitted') {
        // Form submitted; handle accordingly
        console.log("Hellllo");
        window.location.hash = '#form-submitted';
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe 
        src={url} 
        width="100%" 
        height="3408" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0"
        title="Your Unique Title"
        ref={iframeRef}
        style={{"padding": "20px"}}
      >Loading…</iframe>
  );
};

export default GoogleForm;
