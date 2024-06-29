import React from 'react'
import PropTypes from "prop-types"

const Button = ({text, bgColor, textColor, isDisabled, handler = () => {} }) => {
  return (
    <button
      disabled={isDisabled}
      type="button"
      onClick={handler}
      className={`${bgColor} ${textColor} 
        ${isDisabled ? "disabled:bg-gray-500 cursor-not-allowed" : ""}
        cursor-pointer hover:scale-105
        duration-300 py-2 px-8 rounded-full
        relative z-10
      `}
    >
      {isDisabled ? 'Opening Widget' : `${text}`}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  handler: PropTypes.func
}

export default Button