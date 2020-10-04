/**
 * GET /
 * Home page.
 */

const React = require('react')
const ReactDOM = require('react-dom')


class Question {
  questionNumber = -1
  question = ""
  answer = ""
  points = 0
  options = []

  constructor(questionNumber, question, answer, points = 1, options = []){
    this.questionNumber = questionNumber;
    this.question = question;
    this.answer = answer;
    this.points = points;
    this.options = options;
  }

  setQuestion(question){
    this.question = question;
  }

  getQuestion(){
    return this.question;
  }

  setAnswer(answer){
    this.answer = answer;
  }

  getAnswer(){
    return this.answer;
  }

  setPoints(points){
    this.points = points
  }

  getPoints(){
    return this.points;
  }

  addOption(option){
    this.options.push(option);
  }

  removeOption(index){
    if (this.options.length > index){
      this.options.splice(index, 1);
    }
  }

  getOptions(){
    return this.options;
  }

  changeOption(option, index){
    this.options[index] = option;
  }
}

class Test {
  questionList = []
  testTitle = ""

  constructor(testTitle = "Example Test", questionList = []){
    this.testTitle = testTitle;
    this.questionList = questionList;
  }

  setTitle(title){
    this.testTitle = title;
  }

  getTitle(){
    return this.testTitle;
  }

  addQuestion(question){
    if (this.questionList.length == 0){
      this.questionList.push(question);
      return;
    }

    let low = 0
    let high = this.questionList.length - 1
    let mid = 0

    while (high > low){
      mid = Math.round((low + high) / 2);

      if (mid == low || mid == high){
        break;
      }
      else if (this.questionList[mid].questionNumber > question.questionNumber){
        high = mid;
      }
      else if (this.questionList[mid].questionNumber < question.questionNumber){
        low = mid;
      }
    }

    let index = 0

    if (question.questionNumber < this.questionList[mid].questionNumber){
      index = mid - 1;
    }
    else if (question.questionNumber > this.questionList[mid].questionNumber){
      index = mid + 1;
    }
    else{
      index = mid;
    }

    this.questionList.splice(index, 0, question);
  }

  getQuestion(questionNumber){
    return this.questionList[this.indexOf(questionNumber)];
  }

  deleteQuestion(index = -1, questionNumber = -1){
    if (index < 0){
      this.questionList.splice(this.indexOf(questionNumber), 1);
    }
    else if (index >= 0){
      this.questionList.splice(index, 1);
    }
  }

  getQuestions(){
    return this.questionList;
  }

  indexOf(questionNumber){
    let low = 0
    let high = this.questionList.length - 1
    let mid = 0

    while (low < high){
      mid = Math.round((low + high) / 2);

      if (this.questionList[mid].questionNumber == questionNumber){
        return mid;
      }
      else if (this.questionList[mid].questionNumber > questionNumber){
        high = mid;
      }
      else{
        low = mid;
      }
    }

    return -1;
  }

  clean(){
    for (let i = 0; i < this.questionList.length; i++){
      this.questionList[i].questionNumber = i + 1;
    }
  }
}

exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};
