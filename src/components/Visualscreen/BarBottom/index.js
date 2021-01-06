import React from 'react'
import './index.scss'


export default function () {
    const onClick = () => {
        window.location.href = '/views/home'
    }

    return (
        <div className="vs-bottom-bar" onClick={onClick}>
            <div className="edges-left" />
            <div className="edges-right" />
            <h3>Enter React App</h3>
        </div>
    )
}
