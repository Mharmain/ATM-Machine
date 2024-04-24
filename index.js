#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.blueBright('\n\tWelcome to the \'Muhammad Harmain\'- CLI ATM Machine\n'));
let myBalance = 5000;
let myPin = 1234;
let loopOut = true;
while (loopOut) {
    let pinAnswer = await inquirer.prompt([
        {
            name: 'pin',
            message: chalk.yellow('To Login, Please enter your 4-digit PIN: '),
            type: 'number'
        }
    ]);
    if (pinAnswer.pin === myPin) {
        console.log(chalk.green('Congratulations, Login Successful!\n'));
        let loopIn = true;
        while (loopIn) {
            let answer = await inquirer.prompt([
                {
                    name: 'option',
                    message: chalk.yellow('Please select an option: '),
                    type: 'list',
                    choices: ['Check Balance', 'Withdraw', 'Deposit', 'Exit']
                }
            ]);
            switch (answer.option) {
                case 'Check Balance':
                    console.log(chalk.green(`Your current balance is: ${myBalance}`));
                    break;
                case 'Withdraw':
                    let choice = await inquirer.prompt([
                        {
                            name: 'withdrawOption',
                            message: chalk.yellow('Enter the type of withdraw: '),
                            type: 'list',
                            choices: ['Fast Amount', 'Custom Amount']
                        }
                    ]);
                    if (choice.withdrawOption === 'Fast Amount') {
                        let choiceFastAmount = await inquirer.prompt([
                            {
                                name: 'fastAmount',
                                message: chalk.yellow('Select the amount you want to withdraw: '),
                                type: 'list',
                                choices: [500, 1000, 2000, 5000]
                            }
                        ]);
                        if (choiceFastAmount.fastAmount > myBalance) {
                            console.log(chalk.red('Insufficient Balance!'));
                        }
                        else {
                            myBalance -= choiceFastAmount.fastAmount;
                            console.log(chalk.green(`You have successfully withdrawn ${choiceFastAmount.fastAmount}. Your remaining balance is: ${myBalance}`));
                        }
                    }
                    else if (choice.withdrawOption === 'Custom Amount') {
                        let withdrawAnswer = await inquirer.prompt([
                            {
                                name: 'amount',
                                message: chalk.yellow('Enter the amount you want to withdraw: '),
                                type: 'number'
                            }
                        ]);
                        if (withdrawAnswer.amount > myBalance) {
                            console.log(chalk.red('Insufficient Balance!'));
                        }
                        else {
                            myBalance -= withdrawAnswer.amount;
                            console.log(chalk.green(`You have successfully withdrawn ${withdrawAnswer.amount}. Your remaining balance is: ${myBalance}`));
                        }
                    }
                    break;
                case 'Deposit':
                    let choice1 = await inquirer.prompt([
                        {
                            name: 'depositeOption',
                            message: chalk.yellow('Enter the type of deposite: '),
                            type: 'list',
                            choices: ['Fast Amount', 'Custom Amount']
                        }
                    ]);
                    if (choice1.depositeOption === 'Fast Amount') {
                        let choiceFastAmount1 = await inquirer.prompt([
                            {
                                name: 'fastAmount',
                                message: chalk.yellow('Select the amount you want to deposite: '),
                                type: 'list',
                                choices: [500, 1000, 2000, 5000]
                            }
                        ]);
                        myBalance += choiceFastAmount1.fastAmount;
                        console.log(chalk.green(`You have successfully deposited ${choiceFastAmount1.fastAmount}. Your remaining balance is: ${myBalance}`));
                    }
                    else if (choice1.depositeOption === 'Custom Amount') {
                        let depositAnswer = await inquirer.prompt([
                            {
                                name: 'amount',
                                message: chalk.yellow('Enter the amount you want to deposit: '),
                                type: 'number'
                            }
                        ]);
                        myBalance += depositAnswer.amount;
                        console.log(chalk.green(`You have successfully deposited ${depositAnswer.amount}. Your new balance is: ${myBalance}`));
                    }
                    break;
                case 'Exit':
                    console.log(chalk.blueBright('Thank you for using the ATM Machine!'));
                    loopIn = false;
                    loopOut = false;
                    break;
            }
            if (loopIn === true) {
                let continueAnswer = await inquirer.prompt([
                    {
                        name: 'continue',
                        message: chalk.yellow('Do you want to continue?'),
                        type: 'list',
                        choices: ['Yes', 'No']
                    }
                ]);
                if (continueAnswer.continue === 'No') {
                    console.log(chalk.blueBright('Thank you for using the ATM Machine!'));
                    loopIn = false;
                    loopOut = false;
                }
            }
        }
    }
    else {
        console.log(chalk.red('Incorrect PIN! Please try again.'));
        let reEnterPin = await inquirer.prompt([
            {
                name: 'rePin',
                message: chalk.yellow('Do you want to re-enter the PIN?'),
                type: 'list',
                choices: ['Yes', 'No']
            }
        ]);
        if (reEnterPin.rePin === 'No') {
            console.log(chalk.blueBright('Thank you for using the ATM Machine!'));
            loopOut = false;
        }
    }
}
