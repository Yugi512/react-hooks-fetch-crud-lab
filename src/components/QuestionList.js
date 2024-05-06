import React from "react";
import QuestionItem from "./QuestionItem";


function QuestionList({questionState, onDeleteQuestion,patchState}) {


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionState.map((questionItem) => 
       <QuestionItem key={questionItem.id} question={questionItem} onDeleteQuestion={onDeleteQuestion} patchState={patchState}/>
      )}</ul>
    </section>
  );
}

export default QuestionList;
