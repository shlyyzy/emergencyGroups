import React, { useState, useRef } from 'react';
import './ReadOnlyText.css';

const ReadOnlyText = ({ value }) => {
    const [copySuccess, setCopySuccess] = useState("Click link to copy");
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    }
    
    return (
        <div>
            <input readOnly 
                className="readOnly"
                ref={textAreaRef}
                value={value} 
                onClick={copyToClipboard}/>

            {/* Display some message cause I dunno how to generate font box */}
            {copySuccess}
        </div>
    );
};

export default ReadOnlyText;