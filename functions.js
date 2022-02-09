//----------------------------------------- FUNCTIONS -----------------------------------------



            
            function in_array(arr, index){
                for(let i = 0; i < arr.length; i++){
                    if(arr[i] === index){
                        return true;
                    }
                }
                return false;
            }
            
            function disapear(){
                document.getElementById("hefker_title").className = "hefker_title DISAPPEAR";
                setTimeout(() => {
                    document.getElementById("hefker_game").removeChild(document.getElementById("hefker_title"));
                    document.getElementById("hefker_instructions").style.opacity = 1;
                    setTimeout(() => {
                        document.getElementById("hefker_instructions").style.zIndex = 4;
                        document.getElementById("hefker_instructions").style.opacity = 0;
                        setTimeout(() => {
                            document.getElementById("hefker_game").removeChild(document.getElementById("hefker_instructions"));
                        }, 1000);
                    }, 6000);
                }, 1000);
            }

            function set_mouse_animation(){
                let MLI7 = document.getElementById("MLI7");
                MLI7.src = "מסודר/SH 002 b.png";
                EYES.style.display = "none";
                setTimeout(() => {
                    add_text_bubble({text: "תעשה טוב, תקבל טוב!", id: "MB4", class: "mouse", kind: 4, img: "מסודר/SH 030 d.png"}, document.getElementById("seventh_year"));
                    MLI7.src = "מסודר/SH 002 c.png";
                }, 1000);
                setTimeout(() => {
                    remove_text_bubble({id: "MB4"}, document.getElementById("seventh_year"));
                    MLI7.src = "מסודר/SH 002 b.png";
                }, 6000);
            }

            function alarm_interval(){
                document.getElementById("AlarmI7").src = (alarm_src ? "מסודר/SH 018 b.png" : "מסודר/SH 018 a.png");
                alarm_src = !alarm_src;
            }

            function show_geo(){
                document.getElementById("title_img").src = "מסודר/SH 026 a.png";
                title_show("title_slide_down_geo");
                document.getElementById("title_img").style.transform = "scale(0.5) translate(0px, -100px)";
            }
            var alarm7_interval;
            function start_seventh_year(){
                setTimeout(() => {
                    document.getElementById("seventh_year_sign_arrow").style.display = "none";
                    document.getElementById("darkness").style.display = "none";
                }, 3500);
                setTimeout(() => {
                    document.getElementById("darkness").className = "darkness DISAPPEAR";
                    document.getElementById("seventh_year_sign_arrow").className += " DISAPPEAR";
                    document.getElementById('title_img').style.transform = "translate(0px, 100px)";
                    document.getElementById("alarm7").className = "alarm";
                    document.getElementById("AlarmI7").src = "מסודר/SH 018 a.png";
                    clearInterval(alarm7_interval);
                }, 2500);
                document.getElementById('title_img').src = 'מסודר/SH 049 c.png';
                title_show("title_slide_down_calender");
                document.getElementById("cam7_div").onclick = () => {
                    document.dispatchEvent(new CustomEvent("show_title", {detail: {className: "title_slide_down_geo", src: "מסודר/מסך טלוויזיה/SH 038 a2.png", security_camera: true}}));
                }
                setup_bubbles(
                    [
                        "family_photo7",
                        "books7"
                    ],
                    [
                        {text: "בשנת השמיטה חשוב להשקיע יותר זמן עם המשפחה.", id: "BB1", class: "bird", kind: 1, img: "מסודר/SH 030 a.png"},
                        {text: "בשנת השמיטה יש יותר זמן לקרוא ספרים וללמוד.", id: "MB3", class: "mouse", kind: 3, img: "מסודר/SH 030 c.png"}
                    ],
                    document.getElementById("seventh_year")
                );
            }

            function title_show(class_name = "title_slide_down"){
                let title_div = document.getElementById("title_div");
                let title_img = document.getElementById("title_img");
                title_img.style.transform = "translate(0px, -1500px)";
                title_img.className = "title_img " + class_name;
                title_div.style.display = "block";
                setTimeout(() => {
                    switch(class_name){
                        case "title_slide_down_geo":
                            title_img.style.transform = "scale(0.5) translate(0px, -190px)";
                            document.getElementById("title_div").onclick = () => {
                                title_disappear("title_slide_up_geo");
                            };
                            break;
                        case "title_slide_down_calender":
                            title_img.style.transform = "translate(0px, 100px)";
                            document.getElementById("title_div").onclick = () => {
                                title_disappear("title_slide_up_calender");
                            };
                            break;
                        case "title_slide_down_sidur":
                            title_img.style.transform = "translate(0px, 70px) rotateY(180deg)";
                            document.getElementById("title_div").onclick = () => {
                                title_disappear("title_slide_up_sidur");
                            };
                            break;
                        case "title_slide_down_winner":
                            title_img.style.transform = "translate(0px, 70px)";
                            document.getElementById("title_div").onclick = () => {
                                title_disappear("title_slide_up_winner");
                            };
                            break;
                        default:
                            title_img.style.transform = "";
                            document.getElementById("title_div").onclick = () => {
                                title_disappear("title_slide_up");
                            };
                            break;
                    }
                    title_img.className = "title_img";
                }, 1500);
            }
            var first_pioneer_watch = true;
            function show_video(){
                let title_div = document.getElementById("title_div");
                title_div.style.display = "block";
                title_div.className = "title_div TD_blow_up";
                setTimeout(() => {
                    title_div.className = "title_div";
                }, 1500);
                document.getElementById("TDVBackground").style.display = "block";
                document.getElementById("TDVideo").style.display = "block";
                dont_scroll_up = true;
                document.getElementById("TDVideo").onended = () => {
                    setTimeout(() => {
                        title_div.className = "title_div TD_blow_down";
                        setTimeout(() => {
                            title_div.className = "title_div";
                            title_div.style.display = "none";
                            document.getElementById("TDVBackground").style.display = "none";
                            document.getElementById("TDVideo").style.display = "none";
                            if(first_pioneer_watch){
                                first_pioneer_watch = false;
                                add_weight_button();
                            }
                            dont_scroll_up = false;
                        }, 1500);
                    }, 2000);
                };
            }

            var next_event = null;
            var dont_scroll_up = false;
            function title_disappear(class_name = "title_slide_up"){
                if(dont_scroll_up){
                    return;
                }
                document.getElementById("title_img").className = "title_img " + class_name;
                setTimeout(() => {
                    document.getElementById("title_div").style.display = "none";
                    if(next_event != null){
                        document.dispatchEvent(next_event);
                        next_event = null;
                    }
                    if(sixth_year_finish_flag){
                        document.getElementById("sixth_year").style.display = "none";
                        //document.getElementById("seventh_year").style.display = "block";
                        change_phone();
                        mirror6_shown = false;
                        mirror7_shown = true;
                        sixth_year_finish_flag = false;
                        alarm7_interval = setInterval(alarm_interval, 500);
                    }
                }, 1500);
            }

                //  agriculture_game_button
            function agriculture_game_setup(year, tops, lefts, writings, sequence, changers, agriculture_end_title, inner_tv){
                let tv_full_screen = document.getElementById("tv_full_screen" + year);
                tv_agriculture_game_sequence = sequence;
                agriculture_game_index = 0;
                agriculture_game_changer = changers;
                let h3_writing = document.createElement("span");
                h3_writing.id = "agri_game_writing";
                h3_writing.className = "agri_game_writing";
                h3_writing.innerText = "עזרו לגדל חמניות, בחרו את הפעולה הנכונה לטיפול באדמה ובתבואה!";
                setTimeout(() => {
                    h3_writing.onmouseover = () => {
                        h3_writing.innerText = writings[agriculture_game_index];
                    };
                    document.getElementById("TVIfull" + year).onmouseover = () => {
                        h3_writing.innerText = writings[agriculture_game_index];
                    };
                    document.getElementById("TVIfull" + year).onmouseleave = () => {
                        h3_writing.innerText = "עזרו לגדל חמניות, בחרו את הפעולה הנכונה לטיפול באדמה ובתבואה!";
                    };
                }, 1000);
                tv_full_screen.appendChild(h3_writing);
                for(let i = 0; i < tops.length; i++){
                    let agri_button = document.createElement("input");
                    agri_button.type = "button";
                    agri_button.className = "agriculture_game_button";
                    agri_button.id = tv_full_screen.id + "_AGB" + i;
                    agri_button.style.top = tops[i];
                    agri_button.style.left = lefts[i];
                    agri_button.onmouseover = () => {
                        h3_writing.innerText = writings[agriculture_game_index];
                    };
                    agri_button.onclick = () => {
                        if(i === tv_agriculture_game_sequence[agriculture_game_index]){
                            agriculture_game_index++;
                            if(agriculture_game_index === tv_agriculture_game_sequence.length){
                                document.getElementById("TVS" + year).onclick = () => {};
                                setTimeout(() => {
                                    tv_full_screen.className = "tv_full_screen blow_down";
                                }, 1000);
                                setTimeout(() => {
                                    tv_full_screen.style.display = "none";
                                    document.getElementById("games_div").style.display = "none";
                                    games_div.dispatchEvent(new Event("games_div_hidden"));
                                    document.dispatchEvent(agriculture_end_title);
                                    //document.dispatchEvent(next_game_event);
                                    inner_tv.className = "inner_tv";
                                    inner_tv.style.display = "block";
                                    document.getElementById("TVS" + year).src = "./מסודר/מסך טלוויזיה/SH 025 d.png";
                                    //document.getElementById("window_Y6").dispatchEvent(new Event("click"));
                                }, 1500);
                            }
                            document.getElementById("TVIfull" + year).src = agriculture_game_changer[agriculture_game_index];
                            h3_writing.innerText = writings[agriculture_game_index];
                            agri_button.disabled = "disabled";
                        }else{
                            agri_button.className = "agriculture_game_button agri_wrong";
                            setTimeout(() => {
                                agri_button.className = "agriculture_game_button";
                            }, 500);
                        }
                    };
                    tv_full_screen.appendChild(agri_button);
                }
            }

            function start_agriculture_seventh_year(){
                let focused_index = 0;
                const agri_answers = [true, 
                    true, 
                    false, 
                    false, 
                    false, 
                    false, 
                    false, 
                    false, 
                    false, 
                    true];
                let agri_srcs = [
                            "מסודר/מסך טלוויזיה/SH 037 g.png",      // 0
                            "מסודר/מסך טלוויזיה/SH 037 i.png",      // 1
                            "מסודר/מסך טלוויזיה/SH 037 d.png",      // 2
                            "מסודר/מסך טלוויזיה/SH 037 c.png",      // 3
                            "מסודר/מסך טלוויזיה/SH 037 e.png",      // 4
                            "מסודר/מסך טלוויזיה/SH 037 f.png",      // 5
                            "מסודר/מסך טלוויזיה/SH 037 b.png",      // 6
                            "מסודר/מסך טלוויזיה/SH 037 c2.png",     // 7
                            "מסודר/מסך טלוויזיה/SH 037 e.png",      // 8
                            "מסודר/מסך טלוויזיה/SH 037 h.png",      // 9
                            "מסודר/מסך טלוויזיה/SH 037 j.png",
                        ];
                let tv_full_screen = document.getElementById("tv_full_screen7");
                tv_full_screen.style.display = "block";
                let h3_writing = document.createElement("span");
                h3_writing.id = "agri_game_writing7";
                h3_writing.className = "agri_game_writing";
                h3_writing.innerText = "עבור כל פעולה, בחרו האם היא אסורה בשנת שמיטה, או מותרת!";
                tv_full_screen.appendChild(h3_writing);
                document.getElementById("games_div").className = "games_div blow_up";
                for(let i = 0 ; i < tops_agriculture.length; i++){
                    let div = document.createElement("div");
                    div.className = "agriculture_game_button";
                    div.id = "agri_div_7_" + i;
                    div.style.top = tops_agriculture[i];
                    div.style.left = lefts_agriculture[i];
                    tv_full_screen.appendChild(div);
                }
                document.getElementById("agri_div_7_" + focused_index).className = "agriculture_game_button_focused";
                for(let i = 0; i < 2; i++){
                    let img = document.createElement("img");
                    img.id = "agri_7_answer_" + i;
                    img.className = "agri_7_answer";
                    let agri_answer_bool = (i === 0);
                    img.src = (i === 0 ? "מסודר/SH 030 e.png" : "מסודר/SH 030 f.png");
                    img.style.top = "257px";
                    img.style.left = 350 + (240 * i) + "px";
                    tv_full_screen.appendChild(img);
                    img.onclick = () => {
                        if(agri_answer_bool === agri_answers[focused_index]){
                            document.getElementById("agri_div_7_" + focused_index).className = "agriculture_game_button_" + (agri_answer_bool ? "can" : "cant");
                            document.getElementById("TVIfull7").src = agri_srcs[++focused_index];
                            if(focused_index === agri_answers.length){
                                document.dispatchEvent(new Event("setup_hefker_game"));
                                setTimeout(() => {
                                    document.getElementById("games_div").className = "games_div blow_down";
                                    setTimeout(() => {
                                        document.getElementById("games_div").className = "games_div";
                                        document.getElementById("games_div").style.display = "none";
                                        tv_full_screen.style.display = "none";
                                        add_weight_button();
                                        add_text_bubble({text: "בשנת השמיטה מותר לדאוג לעצים שלא יתקלקלו.", id: "BB3", class: "bird", kind: 3, img: "מסודר/SH 030 c.png"}, document.getElementById("seventh_year"));
                                        setTimeout(() => {
                                            add_text_bubble({text: "אבל אסורות עבודות שמטרתן להשביח את הצמחים והפירות.", id: "MB1", class: "mouse", kind: 1, img: "מסודר/SH 030 a.png"}, document.getElementById("seventh_year"));
                                        }, "בשנת השמיטה מותר לדאוג לעצים שלא יתקלקלו.".length * 60);
                                        document.getElementById("TVS7").src = "מסודר/מסך טלוויזיה/SH 025 b.png";
                                        document.getElementById("window_Y7").onclick = () => {
                                            remove_text_bubble({id: "BB3"}, document.getElementById("seventh_year"));
                                            remove_text_bubble({id: "MB1"}, document.getElementById("seventh_year"));
                                            document.getElementById("games_div").className = "games_div blow_up";
                                            document.getElementById("games_div").style.display = "block";
                                            document.getElementById("hefker_game").style.display = "block";
                                            setTimeout(() => {
                                                document.getElementById("games_div").className = "games_div";
                                            }, 1000);
                                        }
                                    }, 1000);
                                }, 2000);
                            }else{
                                document.getElementById("agri_div_7_" + focused_index).className = "agriculture_game_button_focused";
                            }
                        }else{
                            if(document.getElementById("agri_div_7_" + focused_index)){
                                document.getElementById("agri_div_7_" + focused_index).className = "agriculture_game_button_focused agri_wrong";
                            }
                            setTimeout(() => {
                                if(document.getElementById("agri_div_7_" + focused_index)){
                                    document.getElementById("agri_div_7_" + focused_index).className = "agriculture_game_button_focused";
                                }
                            }, 1000);
                        }
                    };
                }
                setTimeout(() => {
                    let games_div = document.getElementById("games_div");
                    games_div.className = "games_div";
                    games_div.style.display = "block";
                    games_div.dispatchEvent(new Event("games_div_shown"));
                }, 1000);
            }

            function check_if_in(elmnt, elmnt_SIZE_Y, elmnt_SIZE_X, L_T, R_B){
                return ((+elmnt.style.top.split("p")[0] > L_T.y &&
                            +elmnt.style.top.split("p")[0] < R_B.y) ||
                            (+elmnt.style.top.split("p")[0] + elmnt_SIZE_Y > L_T.y && 
                            +elmnt.style.top.split("p")[0] + elmnt_SIZE_Y < R_B.y)) &&
                            (+elmnt.style.left.split("p")[0] > L_T.x &&
                            (+elmnt.style.left.split("p")[0] < R_B.x) ||
                            (+elmnt.style.left.split("p")[0] + elmnt_SIZE_X > L_T.x && 
                            +elmnt.style.left.split("p")[0] + elmnt_SIZE_X < R_B.x))
            }

            function drag_and_goal(elmnt, elmnt_SIZE_Y, elmnt_SIZE_X, L_T, R_B, win_event){
                let trigger = new Event("stopped_moving");
                dragElement(elmnt, trigger);
                elmnt.addEventListener("stopped_moving", () => {
                    if(check_if_in(elmnt, elmnt_SIZE_Y, elmnt_SIZE_X, L_T, R_B)){
                        elmnt.dispatchEvent(win_event);
                    }
                });
            }

            document.addEventListener("keydown", (e) => {
                if(!focused_img){
                    return;
                }
                switch(e.keyCode){
                    case 37://---- left
                        focused_img.style.left = (+focused_img.style.left.split("p")[0]) - 1 + "px";
                        break;
                    case 38://---- up
                        focused_img.style.top = (+focused_img.style.top.split("p")[0]) - 1 + "px";
                        break;
                    case 39://---- right
                        focused_img.style.left = (+focused_img.style.left.split("p")[0]) + 1 + "px";
                        break;
                    case 40://---- down
                        focused_img.style.top = (+focused_img.style.top.split("p")[0]) + 1 + "px";
                        break;
                    default:
                        console.log(e.keyCode);
                }
            });

            function dragElement(elmnt, trigger = null) {
                let mir_shown_id = mirror6_shown? "mirror6" : "mirror7";
                let mir_shown = document.getElementById(mir_shown_id);
                let zIndex = elmnt.style.zIndex ? elmnt.style.zIndex : 1;
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                if (document.getElementById(elmnt.id)) {
                // if present, the header is where you move the DIV from:
                    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
                } else {
                    // otherwise, move the DIV from anywhere inside the DIV:
                    elmnt.onmousedown = dragMouseDown;
                }

                function dragMouseDown(e) {
                    if(mir_shown && (mirror6_shown || mirror7_shown)){
                        mir_shown.dispatchEvent(new CustomEvent("mirror_drag_start", {detail: {moving: elmnt}}));
                    }
                    elmnt.style.zIndex = 3;
                    focused_img = elmnt;
                    e = e || window.event;
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }

                function elementDrag(e) {
                    if(mir_shown && (mirror6_shown || mirror7_shown)){
                        mir_shown.dispatchEvent(new CustomEvent("mirror_drag_move", {detail: {moving: elmnt}}));
                    }
                    e = e || window.event;
                    e.preventDefault();
                    // calculate the new cursor position:
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    // set the element's new position:
                    let top = (elmnt.offsetTop - pos2);
                    let left = (elmnt.offsetLeft - pos1);
                    elmnt.style.top = top.toString() + "px";
                    elmnt.style.left = left.toString() + "px";
                }

                function closeDragElement() {
                    /*
                    if(mir_shown && (mirror6_shown || mirror7_shown)){
                        mir_shown.dispatchEvent(new CustomEvent("mirror_drag_stop", {detail: {moving: elmnt}}));
                    }
                    */
                    if(trigger){
                        elmnt.dispatchEvent(trigger);
                    }
                    elmnt.style.zIndex = zIndex;
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            } 

            function change_year(seventh_year = true){
                document.getElementById("phone_before_6_year").style.display = "none";
                document.getElementById("phone_before_7_year").style.display = "none";
                let show = (!seventh_year ? document.getElementById("sixth_year") : document.getElementById("seventh_year"));
                let hide = (seventh_year ? document.getElementById("sixth_year") : document.getElementById("seventh_year"));
                mirror6_shown = !seventh_year;
                mirror7_shown = seventh_year;
                show.style.display = "block";
                hide.style.display = "none";
                if(seventh_year){
                    document.getElementById("pioneersI7").onclick = show_video;
                    //document.getElementById("seventh_year").dispatchEvent(new Event("set_sabbath"));
                    if(inter_water_drop != null){
                        clearInterval(inter_water_drop);
                    }
                }else{
                    setTimeout(() => {
                        inter_water_drop = setInterval(() => {
                            WDSE.currentTime = 0;
                            WDSE.play();
                        }, 800);
                    }, 700);
                }
            }

            function dispatch(){
                document.dispatchEvent(new Event("setup_babushka"));
            }
            
            function play_game(){
                let str = "";
                document.getElementById("phone_before_6_year").style.display = "none";
                document.getElementById("phone_before_7_year").style.display = "none";
                document.getElementById("sixth_year").style.display = "none";
                document.getElementById("seventh_year").style.display = "none";
                document.getElementById("games_div").style.display = "block";
                let radios = document.getElementsByClassName("radio_games");
                for(let i = 0; i < radios.length; i++){
                    str = radios[i].value;
                    if(radios[i].checked){
                        document.getElementById(str).style.display = "block";
                        switch(str){
                            case "hefker_game":
                                setup();
                                break;
                            case "tv_full_screen6":
                                agriculture_game_setup(6,
                                    tops_agriculture,
                                    lefts_agriculture,
                                    [
                                        "יש בארוגה עשבים שוטים ואדמה מיותרת",
                                        "נותרו אבנים גדולות שצריך לסלק",
                                        "הארוגה עדיין לא ישרה",
                                        "כדי שהצמח יגדל טוב צריך גומות.",
                                        "את הזרעים מכניסים לגומות",
                                        "ממלאים את הגומות באדמה דשנה",
                                        "השקו היטב!",
                                        "מגנים על הצמח מפני מזיקים",
                                        "חשוב להמשיך ולהשקות את הצמח",
                                        "גיזום הצמח מאפשר צמיחה נכונה וצורה נאה!",
                                        ""
                                    ],
                                    [6, 3, 7, 2, 8, 4, 5, 0, 9, 1],
                                    ["מסודר/מסך טלוויזיה/SH 037 b.png",
                                        "מסודר/מסך טלוויזיה/SH 037 c.png",
                                        "מסודר/מסך טלוויזיה/SH 037 c2.png",
                                        "מסודר/מסך טלוויזיה/SH 037 d.png",
                                        "מסודר/מסך טלוויזיה/SH 037 e.png",
                                        "מסודר/מסך טלוויזיה/SH 037 e.png",
                                        "מסודר/מסך טלוויזיה/SH 037 f.png",
                                        "מסודר/מסך טלוויזיה/SH 037 g.png",
                                        "מסודר/מסך טלוויזיה/SH 037 h.png",
                                        "מסודר/מסך טלוויזיה/SH 037 i.png",
                                        "מסודר/מסך טלוויזיה/SH 037 j.png"
                                    ],
                                    tenth_game_title,
                                    document.getElementById("inner_tv6"));
                                break;
                            case "tv_full_screen7":
                                start_agriculture_seventh_year();
                                break;
                            case "babushka_game":
                                break;
                            default:
                                break;
                        }
                    }else{
                        document.getElementById(str).style.display = "none";
                    }
                }
                
            }
            /*
            function add_weight(index){
                let weight = document.createElement("img");
                weight.className = "weight";
                weight.id = "weight" + index;
                weight.src = "מסודר/SH 047 " + String.fromCharCode("a".charCodeAt(0) + index) + ".png";
                weight.style.top = 393 + (index % 2 !== 1 ? 0 : 7) + "px";
                weight.style.left = 322 - index * 13 + "px";
                //drag_and_goal(elmnt, elmnt_SIZE_Y, elmnt_SIZE_X, L_T, R_B, win_event);
                //  div.scales{
                //         top: 375px;
                //         left: 338px;
                //         width: 110px;
                //         height: 53px;
                //     }
                document.getElementById("seventh_year").appendChild(weight);
            }
            */
            
            const BUBBLES = [
                {text: "התורה מחייבת מעשר מהחקלאי לעניים.", id: "BB1", class: "bird", kind: 1, img: "מסודר/SH 030 a.png"},
                {text: "התורה מחייבת מעשר מהחקלאי לעניים.", id: "MB1", class: "mouse", kind: 1, img: "מסודר/SH 030 a.png"},
                {text: "מצוות מעשרות מחייבת רק חקלאים.", id: "BB2", class: "bird", kind: 2, img: "מסודר/SH 030 b.png"},
                {text: "הרבה שאינם חקלאים נוהגים לתת מעשר כספים.", id: "MB2", class: "mouse", kind: 2, img: "מסודר/SH 030 b.png"},
                {text: "הרבה חברות מממשות את החסד והערבות בתרומה לקהילה", id: "BB3", class: "bird", kind: 3, img: "מסודר/SH 030 c.png"},
                {text: "הרבה חברות מממשות את החסד והערבות בתרומה לקהילה", id: "MB3", class: "mouse", kind: 3, img: "מסודר/SH 030 c.png"},
                {text: "הצדקה הכי גדולה היא דווקא לתת עבודה לעני, ולא כסף או אוכל.", id: "BB4", class: "bird", kind: 4, img: "מסודר/SH 030 d.png"},
                {text: "הצדקה הכי גדולה היא דווקא לתת עבודה לעני, ולא כסף או אוכל.", id: "MB4", class: "mouse", kind: 4, img: "מסודר/SH 030 d.png"},
            ];
            var bubbles_index = 0;

            function bubble_button_click(){
                let year = document.getElementById("sixth_year").style.display === "none" ? document.getElementById("seventh_year") : document.getElementById("sixth_year");
                if(document.getElementById(BUBBLES[(BUBBLES.length + bubbles_index - 1) % BUBBLES.length].id)){
                    year.removeChild(document.getElementById(BUBBLES[(BUBBLES.length + bubbles_index - 1) % BUBBLES.length].id));
                }
                add_text_bubble(BUBBLES[bubbles_index], year);
                bubbles_index = (bubbles_index + 1) % BUBBLES.length;
            }
            var bubble_inters = [];
            function add_text_bubble(bubble, year){
                /**
                 * 
                 * @param {*} bubble every bubble has TEXT, ID, CLASS, IMG, KIND
                 * @param {*} year the parent div for the bubble
                 */
                let bubble_div = document.createElement("div");
                bubble_div.id = bubble.id;
                bubble_div.className = bubble.class + "_bubble" + bubble.kind;
                let bubble_img = document.createElement("img");
                bubble_img.src = bubble.img;
                bubble_img.className = "bubble_img_" + bubble.class;
                let bubble_span = document.createElement("span");
                bubble_span.className = "new_bubble_span B" + bubble.class + bubble.kind;
                let span_index = 0;
                let next_text = "";
                let tn = document.createTextNode(next_text);
                let SE = document.getElementById((bubble.class.includes("mouse") ? "mouse_squeak_SE" : bubble.class.includes("bird") ? "bird_chirp_SE" : "human_speak_SE"));
                SE.volume = 0.03;
                let SEST = (bubble.class.includes("mouse") ? 0.2 : bubble.class.includes("bird") ? 0.2 : 0.5);
                bubble_span.appendChild(tn);
                let span_inter = setInterval(() => {
                    if(span_index === bubble.text.length){
                        if(bubble_inters.length > 0){
                            let index = 0;
                            for( let i = 0; i < bubble_inters.length; i++){
                                if(bubble_inters[i].id === bubble.id){
                                    index = i;
                                    break;
                                }
                            }
                            bubble_inters.splice(index, 1);
                        }
                        SE.pause();
                        clearInterval(span_inter);
                    }else{
                        next_text += bubble.text[span_index++];
                        bubble_span.removeChild(tn);
                        tn = document.createTextNode(next_text);
                        bubble_span.appendChild(tn);
                        SE.currentTime = SEST;
                        SE.play();
                    }
                }, 60);
                bubble_inters.push({id: bubble.id, inter: span_inter});
                bubble_div.appendChild(bubble_img);
                bubble_div.appendChild(bubble_span);
                year.appendChild(bubble_div);
            }

            function remove_text_bubble(bubble, year){
                /**
                 * 
                 * @param {*} bubble every bubble has TEXT, ID, CLASS, IMG, KIND
                 * @param {*} year the parent div for the bubble
                 */
                document.getElementById((bubble.id.includes("MB") ? "mouse_squeak_SE" : bubble.id.includes("BB") ? "bird_chirp_SE" : "human_speak_SE")).pause();
                let inter = null;
                let index = 0;
                for( let i = 0; i < bubble_inters.length; i++){
                    if(bubble_inters[i].id === bubble.id){
                        inter = bubble_inters[i].inter;
                        index = i;
                        break;
                    }
                }
                clearInterval(inter);
                bubble_inters.splice(index, 1);
                year.removeChild(document.getElementById(bubble.id));
            }

            function setup_bubbles(divs, bubbles, parent){
                /**
                 * sets up bubble events on hover
                 * @param {*} divs every div that sets up a bubble
                 * @param {*} bubbles every bubble has TEXT, ID, CLASS, IMG, KIND
                 * @param {*} year the parent div for the bubble
                 */
                for(let i = 0; i < divs.length; i++){
                    document.getElementById(divs[i]).onmouseover = () => {
                        add_text_bubble(bubbles[i], parent);
                    }
                    document.getElementById(divs[i]).onmouseleave = () => {
                        remove_text_bubble(bubbles[i], parent);
                    }
                }
            }

            function freedom_achieved(){
                setTimeout(() => {
                    let img = document.createElement("img");
                    img.id="free";
                    img.src = "מסודר/097.png";
                    document.getElementById("seventh_year").appendChild(img);
                    document.getElementById("garage_door_SE").volume = 0.3;
                    document.getElementById("garage_door_SE").currentTime = 0;
                    document.getElementById("garage_door_SE").play();
                    for(let i = 1; i <= 5; i++){
                        setTimeout(() => {
                            if(i === 5){
                                document.getElementById("garage_door_SE").pause();
                                document.dispatchEvent(new CustomEvent("show_title", {detail: { src: "./מסודר/102.png", className: "title_slide_down_winner"}}));
                            }else{
                                let src = (97 + i) + "";
                                src = (src.length === 2 ? "0" : "") + src;
                                img.src = "מסודר/" + src + ".png";
                            }
                        }, 700 * i);
                    }
                }, 1000);
            }