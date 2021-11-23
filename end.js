const username = document.getElementById('username');
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById('finalScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerHTML = mostRecentScore;

username.addEventListener('keyup',() => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    console.log("save button has clicked!!");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name:  username.value
    };
    highScores.push(score);

    highScores.sort( (a,b) =>  b.score - a.score);

    console.log(highScores);

};
