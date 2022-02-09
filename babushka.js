
    //----------------------------------------- examples below ------------------------------------------------------->>
    const right_answer_index = [
        0,
        3,
        1,
        2,
        1,
        0,
        2
    ];

    const QUESTIONS = [
        "מסודר/SH 060.png",
        "מסודר/SH 061.png",
        "מסודר/SH 062.png",
        "מסודר/SH 063.png",
        "מסודר/SH 064.png",
        "מסודר/SH 065.png",
        "מסודר/SH 066.png"
    ];

    const babushka_placement = [
        2,
        0,
        3,
        1
    ];
    
    const ADIV_LENGTH = 4;
    var Qchoices = [-1, -1, -1, -1];
    var QchoicesIndex = 0;
    var Qchoice = -1;
    var RightAnswersToWin = 4;
    var inter;
    let rand = -1;
    do{
        rand = Math.floor(Math.random() * QUESTIONS.length) % QUESTIONS.length;
    }while(inChoices(Qchoices, rand));
    Qchoice = rand;
    build_question(rand);

    function inChoices(choices, index){
        for(let i = 0; i < choices.length; i++){
            if(choices[i] === index){
                return true;
            }
        }
        return false;
    }
    for(let i = 0; i < babushka_placement.length; i++){
        let babushka = document.getElementById("babushka_prize" + i);
        babushka.onmouseover = () => {
            babushka.style.transform = "scale(1.5) translate(5px, 5px)";
        }
        babushka.onmouseleave = () => {
            babushka.style.transform = "";
        }
    }

    function answer_click(index){
        let ADIV = document.getElementById("ADIV" + index);
        if(ADIV && ADIV.name === "RIGHT_ANSWER"){
            ADIV.style.border = "3px solid green";
            ADIV.style.backgroundColor = "lightGreen";
            document.getElementById("babushka_prize" + (4 - RightAnswersToWin)).className = "babushka_prize show";
            document.getElementById("babushka_prize" + (4 - RightAnswersToWin)).style.opacity = 1;
            Qchoices[QchoicesIndex] = Qchoice;
            QchoicesIndex++;
            if(--RightAnswersToWin === 0){
                document.getElementById("babushka7").onclick = null;
                document.getElementById("babushka7").onmouseover = null;
                document.getElementById("babushka7").onmouseleave = null;
                document.getElementById("clock7").onmouseover = null;
                document.getElementById("clock7").onmouseleave = null;
                start_phase_two = true;
                setTimeout(() => {
                    phase_two();
                }, 1000);
                /*
                setTimeout(() => {
                    document.getElementById("games_div").className = "games_div blow_down";
                    setTimeout(() => {
                        document.getElementById("babushka_game").style.display = "none";
                        document.getElementById("games_div").style.display = "none";
                        add_weight_button();
                    }, 1000);
                }, 2000);
                */
            }
        }else if(ADIV){
            ADIV.style.border = "3px solid red";
            ADIV.style.backgroundColor = "pink";
            for(let i = 0; i < ADIV_LENGTH; i++){
                let div = document.getElementById("ADIV" + i);
                if(div.name === "RIGHT_ANSWER"){
                    div.style.border = "3px solid green";
                    div.style.backgroundColor = "lightGreen";
                }
            }
        }else{
            for(let i = 0; i < ADIV_LENGTH; i++){
                let div = document.getElementById("ADIV" + i);
                if(div.name === "RIGHT_ANSWER"){
                    div.style.border = "3px solid green";
                    div.style.backgroundColor = "lightGreen";
                }
            }
        }
        if(start_phase_two){
            return;
        }
        setTimeout(() => {
            let rand = -1;
            do{
                rand = Math.floor(Math.random() * QUESTIONS.length) % QUESTIONS.length;
            }while(inChoices(Qchoices, rand));
            Qchoice = rand;
            build_question(rand);
        }, 1000);
    }

    function build_question(index){
        document.getElementById("babushka_background").src = QUESTIONS[index];
        for(let i = 0; i < ADIV_LENGTH; i++){
            let div = document.getElementById("ADIV" + i);
            if(i === right_answer_index[index]){
                div.name = "RIGHT_ANSWER";
            }else{
                div.name = "WRONG_ANSWER";
            }
            div.style.backgroundColor = "transparent";
            div.style.border = "none";
        }
    }
    var start_phase_two = false;
    var sorted_babushka = 0;
    function phase_two(){
        document.getElementById("babushka_background").src = "מסודר/SH 095.png";
        for(let i = 0; i < babushka_placement.length; i++){
            document.getElementById("babushka_game").removeChild(document.getElementById("ADIV" + i));
            let babushka = document.getElementById("babushka_prize" + i);
            babushka.onmouseover = () => {
                babushka.style.cursor = "grab";
            }
            babushka.onmouseleave = () => {
                babushka.style.cursor = "";
            }
            /**
             * div#BADiv{
                    top: 221px;
                    left: 432px;
                    width: 135px;
                    height: 60px;
                    background-color: rgba(255, 255, 255, 0.5);
                }
             */
            drag_and_goal(babushka, 60, 34, {x: 432, y: 221}, {x: 568, y: 281}, new Event("placed"));
            babushka.addEventListener("placed", () => {
                let x = +babushka.style.left.split("p")[0];
                let place;
                babushka.style.top = "210px";
                if(x > 531){
                    babushka.style.left = "533px";
                    place = 3;
                }else if(x > 499){
                    babushka.style.left = "501px";
                    place = 2;
                }else if(x > 469){
                    babushka.style.left = "471px";
                    place = 1;
                }else{
                    babushka.style.left = "434px";
                    place = 0;
                }
                if(i === babushka_placement[place]){
                    babushka.onmousedown = null;
                    babushka.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                    if(++sorted_babushka === 4){
                        setTimeout(() => {
                            document.getElementById("games_div").className = "games_div blow_down";
                            setTimeout(() => {
                                document.getElementById("babushka_game").style.display = "none";
                                document.getElementById("games_div").style.display = "none";
                                add_weight_button();
                            }, 1000);
                        }, 2000);
                    }
                }
            });
        }
    }