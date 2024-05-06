import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionState, setQuestionsState] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => {
      setQuestionsState(questions)
    })
    
  },[])

  function addNewQuestionState(newQuestion){
    setQuestionsState([...questionState, newQuestion])
  }

  function deleteQuestion(deletedQuestion){
    const updatedQuestionState = questionState.filter((questions) => questions.id !== deletedQuestion.id)
    setQuestionsState(updatedQuestionState)
  }

  function patchState(updatedItem){
    const updatedQuestion = questionState.map((question) => {
      if(question.id === updatedItem.id){
        return updatedItem
      } else {
        return question
      }
    });
    setQuestionsState(updatedQuestion)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddNewQuestion={addNewQuestionState}/> : <QuestionList questionState={questionState} onDeleteQuestion={deleteQuestion} patchState={patchState}/>}
    </main>
  );
}

export default App;
