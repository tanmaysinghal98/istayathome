import React from 'react';
import '../styles/ChallengeView.css';
import '../styles/Common.css';

const ChallengeView = (props) => {
    const {bgcolor, title, steps, minutes, points} = props
    return(
        <React.Fragment>
            <div className='challenge-box' style={{background : bgcolor}}>
                <p className='challenge-title'>{title}</p>
            </div>
            <div className='challenge-description' style={{background: bgcolor}}>
                <div className='row h-100'>
                    <div className='col text-center'>
                        <p className='bottom-number'>{steps}</p>
                        <span className='bottom-number-text'>Steps</span>
                    </div>
                    <div className='col text-center'>
                        <p className='bottom-number'>{minutes}</p>
                        <span className='bottom-number-text'>Minutes</span>
                    </div>
                    <div className='col text-center'>
                        <p className='bottom-number'>+{points}</p>
                        <span className='bottom-number-text'>Points</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChallengeView;