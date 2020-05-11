// Object holding all questins and answers to display dynamically to page
let answerObj = [
  {
    question: "What is 500 + 500",
    answerOptions: [1000, 50, 20],
    correctAnswer: 1000,
  },
  {
    question: "What is you favorite emotion?",
    answerOptions: ["happy", "joy", "sad"],
    correctAnswer: "happy",
  },
];
// keep track of users correct and incorrect answers
let score = [];

//keep track of question user is on
let count = 0;

//grab dom elements
let answerSection = document.getElementById("drag-answer-section");
let dragTextId = document.getElementById("dragText");
let questionSection = document.querySelector(".question-section");
let answersContain = document.querySelector(".answer-container");
let submit = document.getElementById("submit");

// drag content functions ---------
function dragstart_handler(e) {
  e.currentTarget.style.backgroundColor = "rgba(255,255,255,.5)";
  e.dataTransfer.setData("text", e.target.id);
}

function dragover_handler(e) {
  e.preventDefault();
}
//   end of drag content function -----

// when content is dropped into containers run this ----

function drop_handler(e) {
  e.preventDefault();
  let dragTextBox = e.target.children[0];
  let dragText = dragTextBox.id === "dragText";

  // check the section an item is being dropped into. If it is an answer section then regulate how many items can be placed in it ---
  if (
    e.srcElement.className === "answer-container" ||
    (e.srcElement.id === "drag-answer-section" &&
      answerSection.children.length < 2)
  ) {
    answerBoxTextCheck(dragText, dragTextBox);

    // get data from the dragged element
    let draggedData = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(draggedData));
  }
}

function start() {
  let x = document.querySelector(".answer-container");

  let pTag = document.createElement("p");
  pTag.textContent = answerObj[count].question;

  questionSection.appendChild(pTag);
  for (let i = 0; i < answerObj[count].answerOptions.length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "answer-box");
    div.setAttribute("id", "a" + i);
    div.setAttribute("ondragstart", "dragstart_handler(event)");
    div.setAttribute("draggable", "true");
    div.setAttribute("data-num", answerObj[count].answerOptions[i]);
    div.setAttribute("data-answerindex", i);
    div.textContent = answerObj[count].answerOptions[i];
    x.appendChild(div);
  }
}
start();
// run functions to make sure the question has been submitted correctly and then check answer to see if it is correct
function runSubmissionCheck() {
  if (checkForInput()) {
    checkAnswer();
    console.log(score);
  }
}

function checkForInput() {
  if (answerSection.children.length === 1) {
    alert("You must drag an answer to the answer area");
    return false;
  } else if (answerSection.children.length > 1) {
    alert("answer has been submitted");
    return true;
  } else {
    console.log("error with checkForInput");
    return false;
  }
}

// gets index of real answer located in an array passed through data attribute and compares it with the value of the dragged box
function checkAnswer() {
  let draggedAnswerData = answerSection.children[1].dataset;
  let index = parseInt(draggedAnswerData.answerindex);
  let answerArea = document.getElementById("drag-answer-section");

  // compare the chosen option with the correct answer
  let result = draggedAnswerData.num == answerObj[count].correctAnswer;

  let record = {
    index: index,
    answeredCorrectly: result,
  };

  //push recorded answer to the score array
  score.push(record);
  count++;

  // get html ready for next questions by clearing dom sections
  clearSections(answerArea);

  // check if there are any questions left. If not then end quiz
  answerBoxTextCheck();
  if (count < answerObj.length) {
    start();
  } else {
    alert("finished!");
    answerArea.innerHTML = "";
  }
}

function clearSections(answerArea) {
  questionSection.innerHTML = "";
  answersContain.innerHTML = "";
  answerArea.removeChild(answerArea.lastChild);
}

//checks if answer is in answer box. If it is not they it will display text stating 'Drag Answer Here'
function answerBoxTextCheck(dragText, dragTextBox) {
  if (dragText) {
    dragTextBox.textContent = "";
  } else {
    dragTextId.textContent = "Drag Answer Here";
  }
}

submit.addEventListener("click", function (e) {
  e.preventDefault();
  runSubmissionCheck();
});
