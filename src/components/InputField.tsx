import React from "react";

interface InputFieldProps {
  title: string
  addTodo: () => void
  setText: (text: string) => void
}

const InputField: React.FC<InputFieldProps> = ({title, addTodo, setText}) => {
  return (
    <label>
      <input type="text" value={title} onChange={ (e) => { setText(e.currentTarget.value) }}/>
      <button onClick={addTodo}>Add todo</button>
    </label>
  )
}

export default InputField