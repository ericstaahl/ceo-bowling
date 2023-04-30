import fs from "fs";
import path from "path";

const file1 = fs.readFileSync(path.resolve(__dirname, "./series01.txt"), {
    encoding: "utf-8",
});

const file2 = fs.readFileSync(path.resolve(__dirname, "./series02.txt"), {
    encoding: "utf-8",
});

const file3 = fs.readFileSync(path.resolve(__dirname, "./series03.txt"), {
    encoding: "utf-8",
});
const file4 = fs.readFileSync(path.resolve(__dirname, "./series04.txt"), {
    encoding: "utf-8",
});

const calculatePart1 = (player: string) => {
    const scores = player.split(/^[^0-9]+/)[1];
    const name = player.split(/[0-9]/)[0];
    const totalScore = scores
        .split(" ")
        .reduce(
            (score, currentScore) => Number(score) + Number(currentScore),
            0
        );
    return { name, totalScore };
};

const calculatePart2 = (player: string) => {
    // get name of player
    const name = player.split(/[0-9]/)[0];
    // get scores of player
    const scores = player.split(/^[^0-9]+/)[1];

    const frames = [];

    // get array of all individual scores
    const arr = scores.split(/\s+/).map((score) => Number(score));

    let lastIndex = null;

    for (let index = 0; index < arr.length; index++) {
        const score = arr[index];
        const nextScore = arr[index + 1];

        if (score === 10 && lastIndex !== index) {
            lastIndex = index;
            frames.push([10]);
        }
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

    frames.forEach((frame) => {
        if (frame.length === 1) {
            totalScore += 10;
            return;
        }
        if (frame[0] + frame[1] === 10) {
            totalScore += 5;
        }
    });
    return { name, totalScore };
};

const calculatePart3 = (player: string) => {
    // get name of player
    const name = player.split(/[0-9]/)[0];
    // get scores of player
    const scores = player.split(/^[^0-9]+/)[1];

    const frames = [];

    // get array of all individual scores
    const arr = scores.split(/\s+/).map((score) => Number(score));

    let lastIndex = null;

    for (let index = 0; index < arr.length; index++) {
        const score = arr[index];
        const nextScore = arr[index + 1];

        if (score === 10 && lastIndex !== index) {
            lastIndex = index;
            frames.push([10]);
        }
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

    let strikeBonus = 0;
    let spareBonus = 0;

    frames.forEach((frame) => {
        if (frame.length === 1) {
            totalScore += 10;
            totalScore += strikeBonus;

            strikeBonus += 2;
            return;
        }
        if (frame[0] + frame[1] === 10) {
            totalScore += 5;
            totalScore += spareBonus;

            spareBonus += 1;
        }
    });
    return { name, totalScore };
};

const calculatePart4 = (player: string) => {
    // get name of player
    const name = player.split(/[0-9]/)[0];
    // get scores of player
    const scores = player.split(/^[^0-9]+/)[1];

    const frames = [];

    // get array of all individual scores
    const arr = scores.split(/\s+/).map((score) => Number(score));

    let lastIndex = null;

    for (let index = 0; index < arr.length; index++) {
        const score = arr[index];
        const nextScore = arr[index + 1];

        if (score === 10 && lastIndex !== index) {
            lastIndex = index;
            frames.push([10]);
        }
        if (lastIndex !== index) {
            lastIndex = index + 1;
            frames.push([score, nextScore]);
        }
    }
    //calculate score

    // caclulate score without bonuses
    let totalScore = arr.reduce(
        (score, currentScore) => score + currentScore,
        0
    );

    let isStrikeBonus = false;
    let isDoubleStrikeBonus = false;
    let isSpareBonus = false;

    // Add bonuses to score.
    frames.forEach((frame) => {
        if (isDoubleStrikeBonus) {
            totalScore += frame[0];
            isDoubleStrikeBonus = false;
        }
        if (isSpareBonus) {
            totalScore += frame[0];
            isSpareBonus = false;
        }

        if (isStrikeBonus) {
            if (frame.length === 1) {
                totalScore += frame[0];
            }

            if (frame.length === 2) {
                totalScore += frame[0];
                totalScore += frame[1];

                // reset
                isStrikeBonus = false;
            }
        }

        if (frame.length === 1) {
            if (isStrikeBonus) isDoubleStrikeBonus = true;
            isStrikeBonus = true;
            return;
        }

        if (frame[0] + frame[1] === 10) {
            isSpareBonus = true;
        }
    });
    return { name, totalScore };
};

const players1 = file1.split(/\r?\n/);
const players2 = file2.split(/\r?\n/);
const players3 = file3.split(/\r?\n/);
const players4 = file4.split(/\r?\n/);

// function to calculate the total score for each player based on each ruleset
const calculateTotalRes = (player: string) => {
    const { totalScore: totalScore1, name } = calculatePart1(player);
    const { totalScore: totalScore2 } = calculatePart2(player);
    const { totalScore: totalScore3 } = calculatePart3(player);
    const { totalScore: totalScore4 } = calculatePart4(player);

    let totalScore = 0;
    totalScore += totalScore1;
    totalScore += totalScore2;
    totalScore += totalScore3;
    totalScore += totalScore4;

    return { name, totalScore };
};

// run all score calculations

const res1 = players1.map((player) => calculateTotalRes(player));
const res2 = players2.map((player) => calculateTotalRes(player));
const res3 = players3.map((player) => calculateTotalRes(player));
const res4 = players4.map((player) => calculateTotalRes(player));

const totalScoresAllPlayers: { name: string; totalScore: number }[] = [];

res1.forEach(({ name }) => {
    const scorePart1 = res1.find((player) => player.name === name);
    const scorePart2 = res2.find((player) => player.name === name);
    const scorePart3 = res3.find((player) => player.name === name);
    const scorePart4 = res4.find((player) => player.name === name);

    if (!scorePart1 || !scorePart2 || !scorePart3 || !scorePart4) {
        console.log("Couldn't find player and score");
        return;
    }

    let totalScore = 0;
    totalScore += scorePart1.totalScore;
    totalScore += scorePart2.totalScore;
    totalScore += scorePart3.totalScore;
    totalScore += scorePart4.totalScore;

    totalScoresAllPlayers.push({ name, totalScore });
});

const compareFn = (
    a: { name: string; totalScore: number },
    b: { name: string; totalScore: number }
) => (a.totalScore > b.totalScore ? -1 : 1);

const winner = totalScoresAllPlayers.sort((a, b) => compareFn(a, b))[0];

console.log(winner);
