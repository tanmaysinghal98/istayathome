import React from 'react';
import '../styles/StepsView.css';
import '../styles/Common.css';

const StepsView = (props) => {
    const {challenge} = props

    const renderSteps = () => {
        return Object.entries(challenge.steps || []).map(([key, value]) => 
            <div className='row justify-content-md-center description-box'>
                <div className='col-sm-12 col-md-6'>  
                    <div className='steps-box'>
                        <div className='circle' >{key}</div>
                        <div>{value}</div>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <React.Fragment>
            {renderSteps()}
        </React.Fragment>
    )
}

export default StepsView;