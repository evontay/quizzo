console.log("App is now started");

//======= Quiz Logic ========//

// A function to create new questions as objects.
function Question (prompt, answers, correctAnswerIndex) {
    this.prompt = prompt;
    this.choices = answers;
    this.correctChoice = correctAnswerIndex;
}

// Create questions for the quiz here.
var question1 = new Question('What was the first animated film released by Walt Disney?', ['A. Snow White and the Seven Dwarfs', 'B. Fantasia', 'C. Alice in Wonderland', 'D. Cinderella'], 0);
var question2 = new Question('What was the name of the prince Aurora was startled by in the forest?', ['A. Prince Stephan', 'B. Prince Edward', 'C. Prince Phillip', 'D. Prince Eric'], 2);
var question3 = new Question("What time did Cinderella's godmother say the spell would break as Cinderella was going to the ball?", ['A. As soon as morning came', 'B. Midnight', 'C. Before the sun goes down', 'D. When the alarm rings'], 1);
var question4 = new Question('How many sisters does the Little Mermaid have?', ['A. Seven', 'B. No sisters', 'C. Six', 'D. Eight'], 2);
var question5 = new Question('Which Disney character fell down a rabbit hole?', ['A. Alice', 'B. Aladdin', 'C. Peter Pan', 'D. Belle'], 0);
var question6 = new Question('Where does the movie "Lilo and Stitch" take place?', ['A. Hawaii', 'B. California', 'C. Puerto Rico', 'D. The Bahamas'], 0);

// An object to represent all the settings and scores together.
var quiz = {
    currentQuestion: 0,
    questions: [question1, question2, question3, question4, question5, question6],
    isGameOver: false,
    player1Points: 0,
    player2Points: 0
};

// should restart the game so it can be played again.
var restart = function(){
    console.log('restart');
    quiz.currentQuestion = 0;
    quiz.isGameOver = false;
    quiz.player1Points = 0;
    quiz.player2Points = 0;
    updateDisplay();
    $('h3').removeClass().html("Player 1 starts first.");
};

// should return a true or false if the quiz is over.
var isGameOver = function(){
    return quiz.isGameOver;
};

// should return 0 if the game is not yet finished. Else it should return either 1 or 2 depending on which player won. It should return 3 if the game is a draw.
var whoWon = function(){
    if (quiz.isGameOver === false) return 0;
    if (quiz.player1Points > quiz.player2Points) return 1;
    if (quiz.player2Points > quiz.player1Points) return 2;
    return 3;
};

// should return an integer that is the number of questions in a game
var numberOfQuestions = function(){
    return quiz.questions.length;
};

// should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
function playTurn (choice) {
    console.log("choice:" + choice);
    if (quiz.isGameOver) {return false;}
    var correct = false;
    if (choice === quiz.questions[quiz.currentQuestion].correctChoice) {
        correct = true;
        if (quiz.currentQuestion % 2) {quiz.player2Points++; console.log("player 2: " + quiz.player2Points); }
        else {quiz.player1Points++; console.log("player 1: " + quiz.player1Points);}
    }
    ++quiz.currentQuestion;
    if (quiz.currentQuestion === numberOfQuestions()) {quiz.isGameOver = true;}
    return correct;
}


// should return an integer that is the zero-based index of the current question in the quiz
var currentQuestion = function(){
    return quiz.currentQuestion;
};

//should return an integer that is the number of choices for the current question
var numberOfAnswers = function(){
    return quiz.questions[quiz.currentQuestion].choices.length;
};

// should return an integer that is the zero-based index the correct answer for the currrent question
var correctAnswer = function(){
    return quiz.questions[quiz.currentQuestion].correctChoice;
};

//======= Interface ========//
$(document).ready(function() 
{console.log("Start game by answering questions.");}
); //closing tag for document-ready

// a function to update the status of the quiz game
function updateDisplay() {
    // Updates player scores whenever updateDisplay runs
    $('h4').eq(0).text('Player 1: ' + quiz.player1Points);
    $('h4').eq(1).text('Player 2: ' + quiz.player2Points);
    
    // announce winner or draw
    console.log("whoWon: " + whoWon());
    if (isGameOver() && whoWon() === 3) {$('h1').text('Game over. It is a draw!'); return; }
    else if (isGameOver() && whoWon() === 2) {$('h1').text('Game over. Player 2 wins!'); return;}
    else if (isGameOver() && whoWon() === 1) {$('h1').text('Game over. Player 1 wins!'); return;}
    
    // if (isGameOver()) { 
    //     $('h1').text('Game over. Winner is ' + whoWon()); 
    //     console.log("game over");
    //     return;}
    
    else {
        $('h1').text((quiz.currentQuestion + 1) + '. ' + quiz.questions[quiz.currentQuestion].prompt);
        $('button').eq(0).text(quiz.questions[quiz.currentQuestion].choices[0]);
        $('button').eq(1).text(quiz.questions[quiz.currentQuestion].choices[1]);
        $('button').eq(2).text(quiz.questions[quiz.currentQuestion].choices[2]);
        $('button').eq(3).text(quiz.questions[quiz.currentQuestion].choices[3]);}
    
    
}

//=== announce whose turn it is =====//
function status() {
    console.log("status here");
    // console.log("isGameOver?" + isGameOver());
    if (isGameOver() === true ) {  
        $('h3').html("The end. Play Again?");
        $('h3').addClass("reset");
        $('h3').on( "click", function(event){
            console.log(event);
            restart();
            } );
        // $('h3').on( "click", function(event){location.reload();} );
        return;}
    if (quiz.currentQuestion % 2 === 0) { $('h3').html("It's Player 1's turn.");}
    // if (quiz.currentQuestion % 2 !== 0) {$('h3').html("It's Player 1's turn.");}
    else {$('h3').html("It's Player 2's turn.");}
    
    
    
}

//=== Makes h3 disappear when player 1 starts ===//
$(document).ready(function(){
    $('button').on('click', function(event){
               
        if (isGameOver()) {restart(); }
        else {playTurn($(this).index());
            console.log("isGameOver?" + isGameOver());
            status(); 
            
        }
        
    updateDisplay();
    });
    updateDisplay(); //updates display at the start of quiz
});



$('.player1').on('click', function(event){
    alert("clicked over player1");
}
);