import React from 'react'

const DifficultyChooser = () => {

    const difficultyButtonStyle: React.CSSProperties = {
        paddingTop: "4px",
        paddingBottom: "4px",
        paddingLeft: "8px",
        paddingRight: "8px",
        border: "0.25px solid rgba(156, 156, 156, 1)",
        borderRadius: "12.71px"
    }

  return (
    <div>
        <div className='difficultyOptions' style={{display:"flex", justifyContent:"center", gap:40}}>
            <button style={difficultyButtonStyle}>
                15 min<br></br>Again
            </button>
            <button style={difficultyButtonStyle}>
                4 day<br></br>Easy
            </button>
            <button style={difficultyButtonStyle}>
                1 day<br></br>Good
            </button>
        </div>
    </div>
  )
}

export default DifficultyChooser