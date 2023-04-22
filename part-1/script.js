const fs = require('fs');
const path = require('path')

const file = fs.readFileSync(path.resolve(__dirname, "./series01.txt"), { encoding: 'utf-8' });

const players = file.split(/\r?\n/);

const playerScores = players.map(player => {
    const scores = player.split(/^[^0-9]+/)[1];
    const name = player.split(/[0-9]/)[0];
    const totalScore = scores.split(' ').reduce(
        (score, currentScore) => Number(score) + Number(currentScore), 0
    );
    return { name, totalScore };
})

const compareFn = (a, b) => a.totalScore > b.totalScore ? -1 : 1

const winner = playerScores.sort((a, b) => compareFn(a, b))[0];
console.log(winner);
