import chalk from "chalk";
import inquirer from "inquirer";
import fetch from "node-fetch";

const apiLink: string = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";

let fetchData = async (data: string) => {
  let fetchQiuz: any = await fetch(data);
  let res = await fetchQiuz.json();
  return res.results; // Corrected "result" to "results"
};

let startQuiz = async () => {
  let data = await fetchData(apiLink);
  let score: number = 0;

  // For user name
  let name = await inquirer.prompt({
    type: "input",
    name: "hname",
    message: "What is your name?",
  });

  for (let i = 0; i < 5; i++) { // Changed i = 1 to i = 0
    let answers = [
      ...data[i].incorrect_answers,
      data[i].correct_answer, // Changed correct_answers to correct_answer
    ];

    let ans = await inquirer.prompt({
      type: "list",
      name: "quiz",
      message: data[i].question,
      choices: answers.map((val: any) => val),
    });

    if (ans.quiz == data[i].correct_answer) {
      ++score;
      console.log(chalk.bold.italic.blue("Correct"));
    } else {
      console.log(
        `Correct answer is ${chalk.bold.italic.yellow(data[i].correct_answer)}`
      );
    }
  }

  console.log(
    `Dear ${chalk.red.bold(name.hname)}, your score is ${chalk.green.bold(
      score
    )} out of ${chalk.green.bold("5")}`
  );
};

startQuiz();
