// Object holding all questins and answers to display dynamically to page
let answerObj = [
  {
    question: "What is 500 + 500",
    answerOptions: [1000, 50, 20],
    correctAnswer: 1000,
  },
];
// keep track of users correct and incorrect answers
let score = [];
let submit = document.getElementById("submit");
let answerSection = document.getElementById("drag-answer-section");
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

function answerBoxTextCheck(dragText, dragTextBox) {
  let dragTextId = document.getElementById("dragText");
  if (dragText) {
    dragTextBox.textContent = "";
  } else {
    dragTextId.textContent = "Drag Answer Here";
  }
}

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

  let result = draggedAnswerData.num == answerObj[index].correctAnswer;

  let record = {
    index: index,
    answeredCorrectly: result,
  };

  //push recorded answer to the score array
  score.push(record);
}

submit.addEventListener("click", function (e) {
  e.preventDefault();
  runSubmissionCheck();
});
