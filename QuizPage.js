var response = [];
var count = 0;

function generateQuizItem(obj) {
var mainDiv = document.createElement('div');
mainDiv.className = 'main-div';

var question = document.createElement('h3');
question.innerHTML = 'Q' + obj.id +'. ' + obj.question;
mainDiv.appendChild(question);

for(var i=0; i<obj.options.length; i++) {
    var label = document.createElement('label');
    label.className = 'label';

    var input =document.createElement('input');
    input.class = 'input';
    input.type = 'radio';
    input.name = 'question' + obj.id;
    input.value = 'option' + (i + 1);
    label.appendChild(input);

    var optionsInText = document.createTextNode(obj.options[i]);
    label.appendChild(optionsInText);
    label.onclick = function(e) {
        if(e.target.name !== undefined) {
            var qId = input.name.slice(8);
            qId = parseInt(qId);
            var optionId = e.target.value.slice(6);
            optionId = parseInt(optionId);

            for(var j=0;j<response.length;j++) {
                if(response[j].id === qId) {
                    response[j]['answerChosen'] = optionId;
                }
            }
        }
    }
    mainDiv.appendChild(label);
}
return mainDiv;
}
var quizForm = document.getElementById('quiz-form');

var xhttp = new XMLHttpRequest();
xhttp.open('GET', 'http://5d76bf96515d1a0014085cf9.mockapi.io/quiz', true);
xhttp.onreadystatechange = function() {
    if(this.readyState === 4) {
        response = JSON.parse(this.responseText);
        for( var i=0; i<response.length; i++) {
            quizForm.appendChild(generateQuizItem(response[i], i));
        }
    }
}
xhttp.send();

var submitButton = document.getElementById('btn');

// submitButton.onclick = function(e) {
//     e.preventDefault();
//     var inputElem = this.querySelectorAll('input[type=radio]');
//     console.log(inputElem);
//     var selectedInputElem = [];
//     for(var i=0; i<inputElem.length; i++) {
//         // console.log(inputElem[i]);
//         console.log(inputElem[i].checked);
//         if(inputElem[i].checked) {
//             // selectedInputElem.push(inputElem[i]);
//             var qId = inputElem[i].name.slice(8);
//             qId = parseInt(qId);
//             var optionId = inputElem[i].value.slice(6); 
//             optionId = parseInt(optionId);

//             // for(var j=0;j<response.length;j++) {
//             //     if(response[j].id === qId) {
//             //         // response[j]['AnswerChosen'] = optionId;
//             //         // console.log(Response[j]);
//             //         // console.log(response[j].AnswerChosen);
//             //         object.id = Response[j].id;
//             //         object.AnswerChosen = optionId;

//             //         console.log(object)
//             //     }
//             // }
//             }
//         }
//             // var mObj= JSON.stringify(response);
//             var count = 0;
//             for(var z=0;z<response.length;z++) {
//                 // console.log(response);
//                 if(response[z].answer === response[z].AnswerChosen) {
//                     ++count;
//                     console.log(count);
//                    }
//             }
//     var main = document.getElementById('main');
//     var result = document.getElementById('result');
//     result.innerHTML = "Your Result:" + count + "/5";
//     result.style.display = "block";
//     submit.style.display = 'none';
//     }


submitButton.onclick = function() {
    console.log(response);
    for (var z=0;z<response.length;z++) {
        if(response[z].answerChosen === response[z].answer){
            count = ++count;
        }
    }
    console.log(count);
    var main = document.getElementById('main');
    var resultPage = document.getElementById('result-page');
    var resultWrapper = document.getElementById('result-wrapper');
    var result = document.getElementById('result');
    result.innerHTML = count + "/" + response.length;
    console.log(result.innerHTML);
    resultPage.style.display = "block";
    // submit.style.display = 'none';
}
tryAgainBtn.onclick = function() {
    location.reload();
}