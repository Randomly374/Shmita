



// --------------- HEFKER GAME ------------------
const FRUIT_LOCATIONS = [
    {x: 70, y: 240},
    {x: 180, y: 150},
    {x: 390, y: 155},
    {x: 530, y: 150},
    {x: 735, y: 115},
    {x: 868, y: 212}
];
const FRUITS = [
    "מסודר/ייבול/SH 021 a.png",
    "מסודר/ייבול/SH 021 b.png",
    "מסודר/ייבול/SH 021 c.png",
    "מסודר/ייבול/SH 021 d.png",
    "מסודר/ייבול/SH 021 e.png",
    "מסודר/ייבול/SH 020 d.png",
];
const ROOT_BASE_LOCATIONS = [
    {x:[554, 600, 646], y: 279},
    {x:[353, 400, 444, 488, 533, 579, 623, 669, 714], y: 308},
    {x:[285, 329, 374, 419, 465, 509, 554, 600, 645, 690], y: 340}
];
const ROOT_VEGGIES = [
    "מסודר/ייבול/SH 020 g.png",
    "מסודר/ייבול/SH 020 q.png",
    "מסודר/ייבול/SH 020 j.png",
    "מסודר/ייבול/SH 020 e.png",
    "מסודר/ייבול/SH 020 f.png",
    "מסודר/ייבול/SH 020 m.png",
    "מסודר/ייבול/SH 020 i.png",
];

const HEFKER_BUBBLES = [
    [
        {text: "בשנת שמיטה אין מעשר כי השדות מופקרים.", id: "BB1", class: "hbird", kind: 1, img: "מסודר/SH 030 a.png"}
    ],
    [
        {text: "המעמדות השונים נפגשים כולם בשדה שהופקר.", id: "BB3", class: "hbird", kind: 3, img: "מסודר/SH 030 c.png"},
        {text: "גם העשיר וגם העני אוספים מהשדה את הייבול לו הם זקוקים.", id: "MB2", class: "hmouse", kind: 2, img: "מסודר/SH 030 b.png"}
    ],
    [
        {text: "האיסוף המשותף בשדה מקרב ומאחד ביניהם.", id: "BB1", class: "hbird", kind: 1, img: "מסודר/SH 030 a.png"}
    ],
    [
        {text: "האחדות הזו ממשיכה לתוך חיי העם.", id: "BB3", class: "hbird", kind: 3, img: "מסודר/SH 030 c.png"},
        {text: "\"כל ישראל ערבים זה לזה\"", id: "MB3", class: "hmouse", kind: 2, img: "מסודר/SH 030 b.png"}
    ]
];
var HBIndex = 0;
document.getElementById("player_crate").style.left = "470px";
var matches_to_win = 5;
for(let i = 0; i < matches_to_win; i++){
    let img = document.createElement("img");
    img.id="to_win_prod" + i;
    img.src = "מסודר/ייבול/SH 021 a.png";
    img.className = "whos_that_produce";
    img.style.left = 750 + (i * 40) + "px";
    document.getElementById("hefker_game").appendChild(img);
}
let fruit_interval;
function setup(){
    fruit_interval = setInterval(() => {
        let capture_img = document.getElementById("target_for_capture");
        let cap_index = Math.floor(Math.random() * 13) % 13;
        document.getElementById("player_crate").style.left = "450px";
        let chosen_rands = [];
        for(let i = 0; i < FRUIT_LOCATIONS.length; i++){
            fruit_reset = false;
            let rand = Math.floor(Math.random() * FRUIT_LOCATIONS.length) % FRUIT_LOCATIONS.length;
            while(in_array(chosen_rands, rand)){
                rand = Math.floor(Math.random() * FRUIT_LOCATIONS.length) % FRUIT_LOCATIONS.length;
            }
            chosen_rands.push(rand);
            let fruit = document.createElement("img");
            let fruit_falls = false;
            fruit.id = "collectable" + i;
            fruit.className = "fruit grow";
            fruit.style.left = FRUIT_LOCATIONS[rand].x + "px";
            fruit.style.top = FRUIT_LOCATIONS[rand].y + "px";
            fruit.src = FRUITS[i];
            let fruit_in_basket = false;
            let fruit_check_fired = false;
            fruit.onclick = ()=>{
                fruit_falls = true;
                fruit.className = "fruit fall";
                setTimeout(() => {
                    fruit.style.top = "400px";
                    if(fruit_reset){
                        return;
                    }
                    if(!fruit_check_fired){
                        fruit_check_fired = true;
                        if(check_if_in_player_crate(fruit)){
                            let img;
                            let PC = document.getElementById("player_crate");
                            PC.appendChild(fruit);
                            fruit.style.left = +fruit.style.left.split("p")[0] - +PC.style.left.split("p")[0] + "px";
                            fruit.style.top = "-3px";
                            fruit.className += " IN_THE_BASKET";
                            fruit_in_basket = true;
                            if(!document.getElementById("answer_check")){
                                img = document.createElement("img");
                                img.id = "answer_check";
                                img.className = "checked_answer";
                            }else{
                                img = document.getElementById("answer_check");
                            }
                            if(i === cap_index){
                                img.src = "מסודר/SH 030 e.png";
                                if(HBIndex > 0){
                                    for(let i = 0; i < HEFKER_BUBBLES[HBIndex - 1].length; i++){
                                        remove_text_bubble(HEFKER_BUBBLES[HBIndex - 1][i], document.getElementById("hefker_game"));
                                    }
                                }
                                if(HBIndex < HEFKER_BUBBLES.length){
                                    for(let i = 0; i < HEFKER_BUBBLES[HBIndex].length; i++){
                                        if(i > 0){
                                            setTimeout(() => {
                                                add_text_bubble(HEFKER_BUBBLES[HBIndex][i], document.getElementById("hefker_game"));
                                            }, HEFKER_BUBBLES[HBIndex][i - 1].text.length * 60);
                                        }else{
                                            add_text_bubble(HEFKER_BUBBLES[HBIndex][i], document.getElementById("hefker_game"));
                                        }
                                    }
                                    setTimeout(() => {
                                        HBIndex++;
                                    }, 5000);
                                }
                                if(--matches_to_win === 0){
                                    clearInterval(fruit_interval);
                                    setTimeout(() => {
                                        document.getElementById("games_div").className = "games_div blow_down";
                                        setTimeout(() => {
                                            document.getElementById("games_div").className = "games_div";
                                            document.getElementById("games_div").style.display = "none";
                                            document.getElementById("hefker_game").style.display = "none";
                                            add_weight_button();
                                            document.getElementById("seventh_year").dispatchEvent(new Event("set_sabbath"));
                                        }, 1000);
                                    }, 1000);
                                }
                                let dis = document.getElementById("to_win_prod" + matches_to_win);
                                dis.className = "whos_that_produce DISAPPEAR";
                                setTimeout(() => {
                                    document.getElementById("hefker_game").removeChild(dis);
                                }, 1000);
                            }else{
                                img.src = "מסודר/SH 030 f.png";
                            }
                            document.getElementById("hefker_game").appendChild(img);
                        }
                    }
                }, 4000);
            }
            document.getElementById("hefker_game").appendChild(fruit);
            setTimeout(() => {
                if(!fruit_falls){
                    fruit.className = "fruit fall";
                }
            }, 8000);
            setTimeout(() => {
                if(!fruit_check_fired){
                    fruit.style.top = "400px";
                    fruit_check_fired = true;
                    if(check_if_in_player_crate(fruit)){
                        let img;
                        let PC = document.getElementById("player_crate");
                        PC.appendChild(fruit);
                        fruit.style.left = +fruit.style.left.split("p")[0] - +PC.style.left.split("p")[0] + "px";
                        fruit.style.top = "-3px";
                        fruit.className += " IN_THE_BASKET";
                        fruit_in_basket = true;
                        if(!document.getElementById("answer_check")){
                            img = document.createElement("img");
                            img.id = "answer_check";
                            img.className = "checked_answer";
                        }else{
                            img = document.getElementById("answer_check");
                        }
                        if(i === cap_index){
                            img.src = "מסודר/SH 030 e.png";
                            if(HBIndex > 0){
                                for(let i = 0; i < HEFKER_BUBBLES[HBIndex - 1].length; i++){
                                    remove_text_bubble(HEFKER_BUBBLES[HBIndex - 1][i], document.getElementById("hefker_game"));
                                }
                            }
                            if(HBIndex < HEFKER_BUBBLES.length){
                                for(let i = 0; i < HEFKER_BUBBLES[HBIndex].length; i++){
                                    if(i > 0){
                                        setTimeout(() => {
                                            add_text_bubble(HEFKER_BUBBLES[HBIndex][i], document.getElementById("hefker_game"));
                                        }, HEFKER_BUBBLES[HBIndex][i - 1].text.length * 60);
                                    }else{
                                        add_text_bubble(HEFKER_BUBBLES[HBIndex][i], document.getElementById("hefker_game"));
                                    }
                                }
                                setTimeout(() => {
                                    HBIndex++;
                                }, 5000);
                            }
                            if(--matches_to_win === 0){
                                clearInterval(fruit_interval);
                                setTimeout(() => {
                                    document.getElementById("games_div").className = "games_div blow_down";
                                    setTimeout(() => {
                                        document.getElementById("games_div").className = "games_div";
                                        document.getElementById("games_div").style.display = "none";
                                        document.getElementById("hefker_game").style.display = "none";
                                        add_weight_button();
                                        document.getElementById("seventh_year").dispatchEvent(new Event("set_sabbath"));
                                    }, 1000);
                                }, 1000);
                            }
                            let dis = document.getElementById("to_win_prod" + matches_to_win);
                            dis.className = "whos_that_produce DISAPPEAR";
                            setTimeout(() => {
                                document.getElementById("hefker_game").removeChild(dis);
                            }, 1000);
                        }else{
                            img.src = "מסודר/SH 030 f.png";
                        }
                        document.getElementById("hefker_game").appendChild(img);
                    }
                }
                fruit_reset = true;
            }, 12000);
            setTimeout(() => {
                if(!fruit_in_basket){
                    document.getElementById("hefker_game").removeChild(fruit);
                }else{
                    //document.getElementById("player_crate").removeChild(fruit);
                }
            }, 13000);
        }
        chosen_rands = [[], [], []];
        for(let i = 0; i < ROOT_VEGGIES.length; i++){
            let root_reset = false;
            let root = document.createElement("img");
            let root_falls = false;
            root.id = "collectable" + (i + 6);
            root.className = "root grow";
            let rand = Math.floor(Math.random() * ROOT_BASE_LOCATIONS.length) % ROOT_BASE_LOCATIONS.length;
            let places = ROOT_BASE_LOCATIONS[rand].x.length;
            let rand_place = Math.floor(Math.random() * places) % places;
            while(in_array(chosen_rands[rand], rand_place)){
                rand = Math.floor(Math.random() * ROOT_BASE_LOCATIONS.length) % ROOT_BASE_LOCATIONS.length;
                places = ROOT_BASE_LOCATIONS[rand].x.length;
                rand_place = Math.floor(Math.random() * places) % places;
            }
            chosen_rands[rand].push(rand_place);
            root.style.top = ROOT_BASE_LOCATIONS[rand].y + "px";
            root.style.left = ROOT_BASE_LOCATIONS[rand].x[rand_place] + "px";
            root.src = ROOT_VEGGIES[i];
            document.getElementById("hefker_game").appendChild(root);
            let root_in_basket = false;
            root.onclick = () => {
                root_falls = true;
                root.className = "root fall";
                setTimeout(() => {
                    root.style.top = "400px";
                    if(root_reset){
                        return;
                    }
                    if(check_if_in_player_crate(root)){
                        let img;
                        let PC = document.getElementById("player_crate");
                        PC.appendChild(root);
                        root.style.left = +root.style.left.split("p")[0] - +PC.style.left.split("p")[0] + "px";
                        root.style.top = "-3px";
                        root_in_basket = true;
                        root.className += " IN_THE_BASKET";
                        if(!document.getElementById("answer_check")){
                            img = document.createElement("img");
                            img.id = "answer_check";
                            img.className = "checked_answer";
                        }else{
                            img = document.getElementById("answer_check");
                        }
                        if((i + 6) === cap_index){
                            img.src = "מסודר/SH 030 e.png";
                            if(HBIndex > 0){
                                for(let i = 0; i < HEFKER_BUBBLES[HBIndex - 1].length; i++){
                                    remove_text_bubble(HEFKER_BUBBLES[HBIndex - 1][i], document.getElementById("hefker_game"));
                                }
                            }
                            if(HBIndex < HEFKER_BUBBLES.length){
                                for(let i = 0; i < HEFKER_BUBBLES[HBIndex].length; i++){
                                    if(i > 0){
                                        setTimeout(() => {
                                            add_text_bubble(HEFKER_BUBBLES[HBIndex][i], document.getElementById("hefker_game"));
                                        }, HEFKER_BUBBLES[HBIndex][i - 1].text.length * 60);
                                    }else{
                                        add_text_bubble(HEFKER_BUBBLES[HBIndex][i], document.getElementById("hefker_game"));
                                    }
                                }
                                setTimeout(() => {
                                    HBIndex++;
                                }, 5000);
                            }
                            if(--matches_to_win === 0){
                                clearInterval(fruit_interval);
                                setTimeout(() => {
                                    document.getElementById("games_div").className = "games_div blow_down";
                                    setTimeout(() => {
                                        document.getElementById("games_div").className = "games_div";
                                        document.getElementById("games_div").style.display = "none";
                                        document.getElementById("hefker_game").style.display = "none";
                                        add_weight_button();
                                        document.getElementById("seventh_year").dispatchEvent(new Event("set_sabbath"));
                                    }, 1000);
                                }, 1000);
                            }
                            let dis = document.getElementById("to_win_prod" + matches_to_win);
                            dis.className = "whos_that_produce DISAPPEAR";
                            setTimeout(() => {
                                document.getElementById("hefker_game").removeChild(dis);
                            }, 1000);
                        }else{
                            img.src = "מסודר/SH 030 f.png";
                        }
                        document.getElementById("hefker_game").appendChild(img);
                    }
                }, 4000);
            }
            setTimeout(() => {
                if(!root_falls){
                    root.className = "root";
                }
            }, 8000);
            setTimeout(() => {
                if(!root_in_basket){
                    document.getElementById("hefker_game").removeChild(root);
                }else{
                    document.getElementById("player_crate").removeChild(root);
                }
                root_reset = true;
            }, 13000);
        }
        let cap_target = document.getElementById("collectable" + cap_index);
        capture_img.src = cap_target.src;
        
        if(document.getElementById("answer_check")){
            document.getElementById("hefker_game").removeChild(document.getElementById("answer_check"));
        }
        
        setTimeout(() => {
            let PC = document.getElementById("player_crate");
            let in_the_basket = document.getElementsByClassName("IN_THE_BASKET");
            for(let j = 0; j < in_the_basket.length; j++){
                PC.removeChild(in_the_basket[j]);
            }
        }, 13000);
        
    }, 13000);
    document.onkeydown = (e) => {
        if(inter_set){
            return;
        }
        if(e.key === "ArrowRight"){
            hefker_arrow_down(document.getElementById("right_arrow"), false, true);
            document.getElementById("right_arrow").style.transform = "scale(1.1)";
            document.getElementById("right_arrow").style.filter = "hue-rotate(-40deg) saturate(300%)";
            
        }else if(e.key === "ArrowLeft"){
            hefker_arrow_down(document.getElementById("left_arrow"), true, true);
            document.getElementById("left_arrow").style.transform = "scale(1.1)";
            document.getElementById("left_arrow").style.filter = "hue-rotate(-40deg) saturate(300%)";
        }
    }
}
var inter_set = false;
var inner_inter;

function hefker_arrow_down(div, direction = true, key_press = false){
    let x = (direction? -1 : 1) * 10;
    let PC = document.getElementById("player_crate");
    if(key_press){
        document.onkeyup = () => {
            hefker_mouse_up();
            div.style.transform = "";
            div.style.filter = "";
        };
    }else{
        document.onmouseup = () => {
            hefker_mouse_up();
        };

        div.ondragstart = () => {
            div.ondragend = () => {
                hefker_mouse_up();
            }
        }
    }
    if(inter_set){
        return;
    }
    inter_set = true;
    inner_inter = setInterval(() => {
        let current_left = +PC.style.left.split("p")[0];
        let left = current_left + x;
        if(direction){
            left = Math.max(left, 0);
        }else{
            left = Math.min(left, 930);
        }
        PC.style.left = left + "px";
    }, 50);

    function hefker_mouse_up(){
        inter_set = false;
        if(inner_inter){
            clearInterval(inner_inter);
        }
        document.onmouseup = null;
        document.onmousedown = null;
    }
}

function check_if_in_player_crate(elmnt){
    let PC = document.getElementById("player_crate");
    let L_T = {x: +PC.style.left.split("p")[0], y: 390};
    let R_B = {x: L_T.x + 100, y:L_T.y + 50};
    if(check_if_in(elmnt, 30, 30, L_T, R_B)){
        elmnt.className = "IN";
        return true;
    }else{
        return false;
    }
}