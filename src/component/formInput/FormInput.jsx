import React from 'react'
import PropTypes from 'prop-types'
import { FaStar } from 'react-icons/fa';


const FormInput = ({text, title, value, handler = () => {} }) => {
    return (
        <div>
            <label htmlFor={text} className="block font-medium text-gray-700">
            <FaStar className="inline-block mr-2" /> {title}
            </label>
            <input
            type="text"
            id={text}
            name={text}
            value={value}
            onChange={handler}
            className="input-style"
            required
            />
        </div>
    )
  }

FormInput.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
}

export default FormInput;