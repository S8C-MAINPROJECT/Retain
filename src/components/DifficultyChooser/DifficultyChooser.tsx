import './DifficultyChooser.css'

const DifficultyChooser = () => {

  return (
    <div>
        <div className='difficultyOptions'>
            <button className='difficultyBtn hard'>
                <span className='difficultyTime'>15 min</span><br></br><span className='difficultyMeasure'>Again</span>
            </button>
            <button className='difficultyBtn medium'>
                <span className='difficultyTime'>4 day</span><br></br><span className='difficultyMeasure'>Easy</span>
            </button>
            <button className='difficultyBtn easy'>
                <span className='difficultyTime'>1 day</span><br></br><span className='difficultyMeasure'>Good</span>
            </button>
        </div>
    </div>
  )
}

export default DifficultyChooser