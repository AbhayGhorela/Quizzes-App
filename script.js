const questions = [
    {
        question:"What is the capital of France?",
        answers:[
            {text:"Berlin",correct:false},
            {text:"Madrid",correct:false},
            {text:"Paris",correct:true},
            {text:"Rome",correct:false},
        ]
    },
    {
        question:"Which planet is known as the Red Planet?",
        answers:[
            {text:"Earth",correct:false},
            {text:"Mars",correct:true},
            {text:"Venus",correct:false},
            {text:"Jupiter",correct:false},
        ]
    },
    {
        question:"Who wrote the play Romeo and Juliet?",
        answers:[
            {text:"William Shakespeare",correct:true},
            {text:"Charles Dickens",correct:false},
            {text:"J.K. Rowling",correct:false},
            {text:"Leo Tolstoy",correct:false},
        ]
    },
    {
        question:"Which language is used to style web pages?",
        answers:[
            {text:"CSS",correct:true},
            {text:"HTML",correct:false},
            {text:"Python",correct:false},
            {text:"Java",correct:false},
        ]
    },
]

const questionElement = document.querySelector("#question")
const answerbtn = document.querySelector("#answer-button")
const nextbtn = document.querySelector("#next-btn")

console.log(questionElement)
console.log(answerbtn)
console.log(nextbtn)

// question number index and score
let currentQuestionIndex = 0;
let score = 0;

// startQuiz() function reset the fuction on default state
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    // showQuestion() function show the question after reset
    showQuestion();
}

function showQuestion(){
    resetState();
    // showing the question form quesstions array-object
    let correctQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${correctQuestion.question}`

    // showing the answers in the button from questions array-object
    correctQuestion.answers.forEach((ans)=>{
        const button = document.createElement("button")
        button.innerHTML = ans.text
        // button.setAttribute("class","btn") both are work same
        button.classList.add("btn")
        answerbtn.appendChild(button)

        if(ans.correct){
            button.dataset.correct = ans.correct;
        }

        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextbtn.style.display = "none"
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild)
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("inCorrect");
    }

    Array.from(answerbtn.children).forEach(btn=>{
        if(btn.dataset.correct === "true"){
            btn.classList.add("correct")
        }

        btn.disabled = true;
    });
    nextbtn.style.display = "block"
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`
    nextbtn.innerHTML = "Play Again"
    nextbtn.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()