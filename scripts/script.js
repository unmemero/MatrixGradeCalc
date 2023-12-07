const calculateButton = document.getElementById('calculate');
calculateButton.onclick = () => {
    let homeworkGrade = homeworkHandler();
    let examGrade = examHandler();
    let finalGrade = finalHandler(); // TODO: Change possible total. temporary value of 100
    let total = totalHandler(homeworkGrade,examGrade,finalGrade);
    let letterGrade = letterHandler(total);
    exportHandler(homeworkGrade,examGrade,finalGrade,total,letterGrade);
};
function homeworkHandler(){
    let hwString = 'hw';
    let hwTotal = 0;
    for (let i = 1; i < 16; i++){
        hwString += i;
        if(document.getElementById(hwString).value!=''){
            hwTotal += parseInt(document.getElementById(hwString).value);
        }
        hwString = 'hw';
    }
    document.getElementById('hwTotal').innerHTML = hwTotal+' / 1500';
    let hwPercent = Math.round((hwTotal*10)/1500);
    document.getElementById('hwPercent').innerHTML = hwPercent + '%';
    return hwPercent;
}
function examHandler(){
    let examString = 'e';
    let examTotal = 0;
    for(let i=1;i<4;i++){
        examString += i;
        if(document.getElementById(examString).value!=''){
            examTotal += parseInt(document.getElementById(examString).value);
        }
        examString = 'e';
    }
    document.getElementById('eTotal').innerHTML = examTotal + ' / 177';
    let examPercent = Math.round((examTotal*54)/177);
    document.getElementById('ePercent').innerHTML = examPercent + '%';
    return examPercent;
}
function finalHandler(){
    let finalExam = 0;
    if(document.getElementById('f1').value!=''){
        finalExam = (parseInt(document.getElementById('f1').value)*36)/100; //TODO: Change 100 for actual possible total.
    }
    document.getElementById('fPercentage').innerHTML = finalExam + '%';
    return finalExam;
}
function totalHandler(hw,e,f){
    return hw + e + f;
}
function letterHandler(total){
    document.getElementById('totalPercent').innerHTML = total + '%';
    let letterGrade = '';
    if(total>89){
        letterGrade = 'A';
        document.getElementById('letterGrade').innerHTML = letterGrade;
    }
    else if(total>79 && total<90){
        letterGrade = 'B';
        document.getElementById('letterGrade').innerHTML = letterGrade;
    }
    else if(total>69 && total<80){
        letterGrade = 'C';
        document.getElementById('letterGrade').innerHTML = letterGrade;
    }
    else if(total>59 && total<70){
        letterGrade = 'D';
        document.getElementById('letterGrade').innerHTML = letterGrade;
    }
    else{
        letterGrade = 'F';
        document.getElementById('letterGrade').innerHTML = letterGrade;
    }
    return letterGrade;
}
function exportHandler(h,e,f,t,l){
    exportText = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>My grades Math 3323 Fall 2023</title><style>body{color:green;background: black;display: flex;flex-direction: column;align-items: center;justify-content: center;}td,th{border:solid 1px white;padding: 10px;}</style></head><body><h1>My Grades Fall 2023 Math 2300</h1><table><tr><th>Criterion</th><th>Grade</th></tr><tr><th>Homework</th><td>"+h+"%"+"</td></tr><tr><th>Exams</th><td>"+e+"%"+"</td></tr><tr><th>Final</th><td>"+f+"%"+"</td></tr><tr><th>Total</th><td>"+t+"%"+"</td></tr><tr><th>Letter Grade</th><td>"+l+"</td></tr></table></body></html>";
    var blob = new Blob([exportText], {type: "text/html;charset=utf-8"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "grades.html";
    link.click();
}