import {
  NAN_MESSAGE,
  WRONG_NUMBER_MESSAGE,
  DUPLICATE_NUMBER_MESSAGE,
} from '../library/constants/alert-message.js';
import { MIN3DIGIT } from '../library/constants/number.js';
import { hasDuplicateCharacter } from '../library/utils/check.js';

class UserInput {
  #$target;
  #props;
  #$userInput;

  constructor($target, props) {
    this.#$target = $target;
    this.#props = props;
    this.#$userInput = $target.querySelector('#user-input');
    this.initializeEventListener();
  }

  initializeEventListener() {
    this.#$target.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onSubmit(event) {
    event.preventDefault();
    const input = this.#$userInput.value;
    if (this.isValidInput(input)) {
      const userNumber = parseInt(input, 10);
      this.#props.userNumber.value = userNumber;
    } else {
      this.alertByCase(input);
      this.clearInput();
      this.#$userInput.focus();
    }
  }

  isValidInput(input) {
    const inputNumber = Number(input);

    return (
      !isNaN(inputNumber) &&
      input.length === 3 &&
      inputNumber >= MIN3DIGIT &&
      !hasDuplicateCharacter(input)
    );
  }

  alertByCase = (input) => {
    const errorCase = [];
    const inputNumber = Number(input);

    if (isNaN(inputNumber)) {
      errorCase.push(NAN_MESSAGE);
    } else {
      if (input.length !== 3 || inputNumber < MIN3DIGIT) {
        errorCase.push(WRONG_NUMBER_MESSAGE);
      }
      if (hasDuplicateCharacter(input)) {
        errorCase.push(DUPLICATE_NUMBER_MESSAGE);
      }
    }
    alert(`${errorCase.join(', ')}를 입력하셨습니다. 다시 입력해주세요.`);
  };

  clearInput = () => {
    this.#$userInput.value = '';
  };
}

export default UserInput;
