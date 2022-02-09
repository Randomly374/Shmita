var code_game_shown = false;
var code_question_number = 0;
const CGcorrect_answers = [
    5,
    6,
    2,
    1
];
var CGcorrectly_answered = [
    false,
    false,
    false,
    false
];
function code_game_click(){
    let GD = document.getElementById("games_div");
    let CG = document.getElementById("code_game");
    let class_add;
    if(!code_game_shown){
        class_add = "blow_up";
        GD.style.display = "block";
        CG.style.display = "block";
    }else{
        class_add = "blow_down";
        setTimeout(() => {
            CG.style.display = "none";
            GD.style.display = "none";
        }, 970);
    }
    GD.className = "games_div " + class_add;
    setTimeout(() => {
        GD.className = "games_div";
    }, 1000);
    code_game_shown = !code_game_shown;
}
const number_positions = [
    {x: 95, y: 72},
    {x: 151, y: 72},
    {x: 207, y: 72},
    {x: 95, y: 126},
    {x: 151, y: 126},
    {x: 207, y: 126},
    {x: 95, y: 180},
    {x: 151, y: 180},
    {x: 207, y: 180}
];
for(let i = 0; i < 4; i++){
    let img = document.createElement("img");
    img.id = "code_answer" + i;
    img.className = "code_answer";
    img.src = "מסודר/SH 070.png";
    img.style.top = 105 + (54 * i) + "px";
    img.onclick = () => {
        click_code_answer(i);
    };
    document.getElementById("code_game").appendChild(img);
}

var CGcan_click_flag = true;
for(let i = 0; i < number_positions.length; i++){
    let div = document.createElement("div");
    div.id = "CGnumber" + i;
    div.className = "CGnumber";
    div.style.top = number_positions[i].y + "px";
    div.style.left = number_positions[i].x + "px";
    div.onclick = () => {
        if(!CGcan_click_flag){
            return;
        }
        CGcan_click_flag = false;
        let img = document.getElementById("code_answer" + code_question_number);
        img.style.display = "block";
        img.src = "מסודר/SH 0" + (70 + i) + ".png";
        img.name = i + "";
        let answer_status = (i === CGcorrect_answers[code_question_number] ? "right" : "wrong");
        CGcorrectly_answered[code_question_number] = (i === CGcorrect_answers[code_question_number]);
        img.className = "code_answer CA" + answer_status + " CAanimate";
        setTimeout(() => {
            img.className = "code_answer CA" + answer_status;
        }, 990);
        setTimeout(() => {
            CGcan_click_flag = true;
            click_code_answer(find_next_question());
        }, 1000);
    }
    document.getElementById("code_game").appendChild(div);
}

function click_code_answer(index){
    if(index === CGcorrect_answers.length){
        CGtrigger_ending();
        return;
    }
    code_question_number = index;
    document.getElementById("CGBackground").src = "מסודר/SH 0" + (80 + index) + ".png";
    let arr_checked = document.getElementsByClassName("CAfocused");
    if(arr_checked.length > 0){
        let WIA = +(arr_checked[0].name);
        arr_checked[0].className = "code_answer CA" + (WIA === CGcorrect_answers[+arr_checked[0].id.split("r")[1]] ? "right" : "wrong");
    }
    document.getElementById("code_answer" + code_question_number).className = "code_answer CAfocused";
}

function find_next_question(){
    for(let i = code_question_number + 1; i < CGcorrect_answers.length; i++){
        if(!CGcorrectly_answered[i]){
            return i;
        }
    }
    for(let i = CGcorrect_answers.length - 1; i >= 0; i--){
        if(!CGcorrectly_answered[i]){
            return i;
        }
    }
    return CGcorrect_answers.length;
}

function CGtrigger_ending(){
    code_game_shown = true;
    code_game_click();
    document.getElementById("code_door_div").style.display = "none";
    freedom_achieved();
}