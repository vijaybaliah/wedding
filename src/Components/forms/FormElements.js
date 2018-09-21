import React from 'react'

export const FormInput = ( props ) => {
    return (<div>
        <input {...props.input} />
        {props.meta.touched? <span className={'fieldError'}>{props.meta.error || props.error}</span>: ''}
    </div>)
}
