var Question = document.getElementById("question");
var FormElm = document.getElementById("options");
var button = document.getElementById("nextBtn");
var timerDisplay = document.getElementById("timer")

let questions = [];

let currentQuestionIndex = 0;
var score = 0
//  let timer;
//  let timeleft = 30



async function Questions() {
    let res = await fetch(`https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple`);
    let data = await res.json();
    questions = data.results

    ShowQuestions()
}
function StartTimer() {
    clearInterval(timer);
    let timeleft = 30;
    timerDisplay.textContent = `Time Remaining${timeleft}s`
    timer = setInterval(() => {
        timeleft--;
        timerDisplay.textContent = `Time Remaining${timeleft}s`
        if (timeleft <= -1) {
            clearInterval(timer);
            alert("Time's up! Moving to the next question.");
            nextQuestion();
        }

    }, 1000);

}
function ShowQuestions() {
    const current = questions[currentQuestionIndex];
    Question.textContent = current.question;
    button.disabled = true;
    console.log(current)

    let options = [...current.incorrect_answers, current.correct_answer];

    button.disabled = true;

    let labels = document.querySelectorAll('label');
    options.forEach((option, i) => {
        labels[i].querySelector('input').checked = false;
         labels[i].querySelector('input').value = option;
        labels[i].lastChild.textContent = option;
    })
    StartTimer()
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Finish";
        // alert("total score", score)
    } else {
        nextBtn.textContent = "Next Question";
    }
}
FormElm.addEventListener("change", () => {
    button.disabled = false;
});

button.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    let CorrectOption = questions[currentQuestionIndex].correct_answer;

  if (selectedOption && selectedOption.value === CorrectOption) {
    score += 10;
};
nextQuestion()
});

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        ShowQuestions()
    } else {
        alert("Quiz finished!");
        alert("Your total score is: " + score);
        currentQuestionIndex = 0;
        ShowQuestions();
    }
}
Questions()
