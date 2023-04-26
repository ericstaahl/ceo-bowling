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

    // create frames (using arrays) by combing the current score with the second
    // make sure its only calculated on every other entry (if the previous wasn't a strike)
    let lastIndex;

    for (let index = 0; index < arr.length; index++) {
        // check for strike
        if (arr[index] === 10) {
            lastIndex = index
            frames.push([10])
            continue;
        }

        if (arr[index + 1] === undefined) {
            continue;
        };

        if (lastIndex !== index) {
            lastIndex = (index + 1)
            frames.push([arr[index], arr[index + 1]])
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
})

const compareFn = (a, b) => a.totalScore > b.totalScore ? -1 : 1

const winner = playerScores.sort((a, b) => compareFn(a, b))[0];

console.log(winner)
