import React,{useState} from "react";

function QuestionItem({ question, onDeleteQuestion, patchState}) {
  const { id, prompt, answers, correctIndex } = question;
  
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => onDeleteQuestion(question))
  }

  function handleChange(e){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: e.target.value,
      })
    })
    .then((r) => r.json())
    .then((updatedItem) => patchState(updatedItem))
    
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => handleChange(e)}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
