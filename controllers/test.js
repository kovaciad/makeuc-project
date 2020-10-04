const User = require('../models/User');
const pdfGen = require('./pdf')

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
    testId = Math.round(Math.random() * 10000);
  
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

const updateUserTests = (req, test) => { 
    User.findById(req.user.id, (err, user) => {
      user.tests.push(test); // Will need to be a full Test Object
      console.log("User ID Update: " + req.user.id);
      console.log(req.body.test);
      user.save((err) => {
        if (err) {
          return console.error(err);
        }
      });
    });
}

exports.getUserTests = (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) return console.error(err);
        console.log("User ID Get: " + req.user.id);
        console.log(user.tests);
        let tempTests = user.tests;
        res.render('testList', {pog: tempTests, res: req});
    });
}

exports.testGenerator = (req, res) => {
  res.render('testGenerator', {
    title: 'Test Generator'
  });
}

exports.testTest = (req, res) => {
  updateUserTests(req, {
    testTitle: "Test Title",
    questionList: [{question: "Test Question", answer: "Test Answer", points: 0, options: []},
                   {question: "Test MC Question", answer: "1", points: 0, options: ["Test 1", "Test 2", "Test 3"]},
                   {question: "Test MC Question", answer: "1", points: 0, options: ["Test 1", "Test 2", "Test 3"]}],
    testId: Math.round(Math.random()*10)
  });
}