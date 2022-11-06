const { Random, Console } = require("@woowacourse/mission-utils");

const MAX_SIZE = 3;
const START_NUMBER = 1;
const END_NUMBER = 9;
const REPLAY_GAME_KEY = '1';
const END_GAME_KEY = '2';

class App {
    constructor() {
        this.computerNumbers = 0;
        this.userNumbers = 0;
    }

    play() {
        Console.print('숫자 야구 게임을 시작합니다.');
        this.startGame();
    }

    startGame() {
        this.initComputerNumbers();
        this.isUserNumbers();
    }

    initComputerNumbers() {
        const tempNumbers = [];
        while (tempNumbers.length < MAX_SIZE) {
            const randomNumber = Random.pickNumberInRange(START_NUMBER, END_NUMBER);
            if (tempNumbers.includes(randomNumber)) continue;
            tempNumbers.push(randomNumber);
        }
        this.computerNumbers = parseInt(tempNumbers.join(''));
    }

    answerUserNumbers() {
        return Console.readLine('숫자를 입력해주세요 : ',(input) => {
            this.validateInput(input);
            this.finishGame(parseInt(input));
        })
    }

    validateInput(input) {
        if(isNaN(input)) throw new Error('숫자를 입력해주세요.');
        if(input.toString().length !== MAX_SIZE) throw new Error('3자리 숫자를 입력해주세요.');
        if(new Set(input).size !== MAX_SIZE) throw new Error('중복되지 않는 숫자를 입력해주세요.');
        if(String(input).indexOf(0) !== -1) throw new Error('1부터 9의 숫자만 입력해주세요.');
    }

    finishGame() {
        Console.print('3스트라이크');
        Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
        return this.answerReplayGame();
    }

    answerReplayGame() {
        Console.print(`게임을 새로 시작하려면 ${REPLAY_GAME_KEY}, 종료하려면 ${END_GAME_KEY}를 입력하세요.`);
        Console.readLine('', (answer) => {
            if(answer === REPLAY_GAME_KEY) return this.startGame();
            if(answer === END_GAME_KEY) return Console.print('게임 종료');
            if(answer !== REPLAY_GAME_KEY && answer !== END_GAME_KEY) throw new Error(`${REPLAY_GAME_KEY} 또는 ${END_GAME_KEY}를 입력하세요.`);
        })
    }

    ballAndStrikeCalc(computerPickNumber,userNumbers){
        let ball = 0;
        let strike = 0;
        for(let idex = 0; idex < String(computerPickNumber).length; idex++){
            const OVERLAP_INDEX = String(computerPickNumber).indexOf(String(userNumbers)[idex]);
            if(OVERLAP_INDEX > -1 && OVERLAP_INDEX == idex) strike += 1;
            if(OVERLAP_INDEX > -1 && OVERLAP_INDEX !== idex) ball += 1;         
        }
        return this.isProvideHints(ball,strike);
    }

    isProvideHints(ball,strike) {
        if(ball == 0 && strike == 0) return Console.print(`낫싱`);
        if(ball == 0 && strike > 0)  return Console.print(`${strike}스트라이크`);
        if(ball > 0 && strike == 0)  return Console.print(`${ball}볼`);
        if(ball > 0 && strike > 0)  return Console.print(`${ball}볼 ${strike}스트라이크`);
    }
}
module.exports = App;