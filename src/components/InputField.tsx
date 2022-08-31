import React from "react";

interface InputFieldProps {
  text: string
  addTodo: () => void
  setText: (text: string) => void
}

const InputField: React.FC<InputFieldProps> = ({text, addTodo, setText}) => {
  return (
    <label>
      <input type="text" value={text} onChange={ (e) => { setText(e.currentTarget.value) }}/>
      <button onClick={addTodo}>Add todo</button>
    </label>
  )
}

export default InputField