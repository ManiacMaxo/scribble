import React from 'react'
import styles from './Input.module.scss'

interface Props {
    name: string
    type: string
    placeholder?: string
    required?: boolean
    autocomplete?: string
    options?: any
}

const Input: React.FunctionComponent<Props> = (props) => {
    const name = props.placeholder ? props.placeholder : props.name
    return (
        <div className={styles.group} key={props.name}>
            <input
                type={props.type}
                name={props.name}
                placeholder={name}
                autoComplete={props.autocomplete || props.name}
                aria-label={props.name}
                required={props.required}
                aria-required={props.required}
                {...props.options}
            />
            <label htmlFor={props.name}>{name}</label>
        </div>
    )
}

export default Input
