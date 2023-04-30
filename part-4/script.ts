import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./series04.txt"), {
    encoding: "utf-8",
});

const players = file.split(/\r?\n/);

const playerScores = players.map((player) => {
    // get name of player
    const name = player.split(/[0-9]/)[0];
    // get scores of player
    const scores = player.split(/^[^0-9]+/)[1];

    const frames = [];

    // get array of all individual scores
    const arr = scores.split(/\s+/).map((score) => Number(score));
    console.log(name);

    let lastIndex = null;

    for (let index = 0; index < arr.length; index++) {
        const score = arr[index];
        const nextScore = arr[index + 1];

        if (score === 10 && lastIndex !== index) {
            lastIndex = index;
            frames.push([10]);
        }
        // console.log(lastIndex === index);
        if (lastIndex !== index) {
            lastIndex = index + 1;
            frames.push([score, nextScore]);
        }
    }
    //calculate score

    let totalScore = arr.reduce(
        (score, currentScore) => score + currentScore,
        0
    );

    let strikeBonusTurn: null | number = null;
    let isSpareBonus = false;

    frames.forEach((frame) => {
        if (isSpareBonus) {
            totalScore += frame[0];
            isSpareBonus = false;
        }

        if (strikeBonusTurn && strikeBonusTurn >= 2) strikeBonusTurn === null;

        if (strikeBonusTurn !== null) {
            if (
                frame.length === 1 &&
                strikeBonusTurn !== null &&
                strikeBonusTurn < 2
            ) {
                totalScore += frame[0];

                // add to bonus turn count
                strikeBonusTurn += 1;
            }

            if (frame.length === 2) {
                totalScore += frame[0];
                totalScore += frame[1];

                // reset
                strikeBonusTurn = null;
            }
        }

        if (frame.length === 1) {
            totalScore += 10;

            strikeBonusTurn = 0;
            return;
        }

        if (frame[0] + frame[1] === 10) {
            totalScore += frame[0];
            totalScore += frame[1];

            isSpareBonus = true;
        }
    });
    return { name, totalScore };
});

const compareFn = (
    a: { name: string; totalScore: number },
    b: { name: string; totalScore: number }
) => (a.totalScore > b.totalScore ? -1 : 1);

const winner = playerScores.sort((a, b) => compareFn(a, b))[0];

console.log(winner);
