const fs = require('fs');
const path = require('path')

const file = fs.readFileSync(path.resolve(__dirname, "./series02.txt"), { encoding: 'utf-8' });

const players = file.split(/\r?\n/);

const playerScores = players.map(player => {
    // get name of player
    const name = player.split(/[0-9]/)[0];
    // get scores of player
    const scores = player.split(/^[^0-9]+/)[1];

    const frames = [];

    // get array of all individual scores
    const arr = scores.split(' ').map((score) => Number(score))

    let lastIndex = null

    for (let index = 0; index < arr.length; index++) {
        const score = arr[index];
        const nextScore = arr[index + 1];
        console.log(score, nextScore)
        if (score === 10) {
            lastIndex = index;
            frames.push([10]);
            continue;
        };
        if (lastIndex !== index && nextScore) {
            lastIndex = (index + 1);
            frames.push([score, nextScore]);
            continue;
        }
    }
    //calculate score

    let totalScore = 0;

    frames.forEach(
        (frame) => {
            frame.forEach((score) => totalScore += score)
            if (frame[0] === 10) {
                totalScore += 10;
            } else if (frame[0] + frame[1] === 10) {
                totalScore += 5
            }
        }
    );

    return { name, totalScore };
});

const compareFn = (a, b) => a.totalScore > b.totalScore ? -1 : 1

// console.log(playerScores.sort((a, b) => compareFn(a, b)))

const winner = playerScores.sort((a, b) => compareFn(a, b))[0];

console.log(winner)
