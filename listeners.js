//---------------------------------------------------------------------- EVENT LISTENERS -------------------------------------------------------------------------------------------------------


            let games_div = document.getElementById("games_div");
            var remove_divs = [];
            games_div.addEventListener("games_div_shown", () => {
                document.getElementById("water_drop_SE").volume = 0;
            });

            games_div.addEventListener("games_div_hidden", () => {
                document.getElementById("water_drop_SE").volume = 0.002;
            });

            document.addEventListener("show_title", (e) => {
                let className = e.detail.className;
                let title_img = document.getElementById("title_img");
                title_img.style.display = "block";
                title_img.src = e.detail.src;
                title_show(className);
                if(e.detail.after_tenth){
                    let counter = 0;
                    dont_scroll_up = true;
                    title_img.onclick = () => {
                        if(counter < 5){
                            title_img.src = "מסודר/SH 0" + (90 + counter) + ".png";
                        }
                        if(++counter >= 6){
                            title_img.onclick = null;
                            dont_scroll_up = false;
                        }
                    }
                }
                if(e.detail.security_camera){
                    let counter = 0;
                    dont_scroll_up = true;
                    title_img.onclick = () => {
                        if(counter < 2){
                            title_img.src = "מסודר/מסך טלוויזיה/SH 038 " + String.fromCharCode("b".charCodeAt(0) + counter) + "2.png";
                        }
                        if(++counter >= 3){
                            title_img.onclick = null;
                            dont_scroll_up = false;
                        }
                    }
                }
                if(e.detail.next_game_event){
                    next_event = e.detail.next_game_event;
                }
            });

            document.addEventListener("game_start", (e) => {
                e.flag = true;
                if(e.detail.next_game === "tenth"){
                    document.getElementById("CLI6").src = "מסודר/SH 017 d.png";
                    let arrow = document.getElementById("tenth_arrow");
                    arrow.style.display = "block";
                    setTimeout(() => {
                        document.getElementById("window_Y6").dispatchEvent(new Event("click"));
                    }, 3000);
                }
                let top = "0px";
                let left = "0px";
                let massage_class = "massage";
                if(e.detail.massage_location === "mouse"){
                    top = "400px";
                    left = "80px";
                    massage_class = "mouse_massage";
                }
                let img = document.createElement("img");
                img.src = e.detail.massage;
                img.className = massage_class + "_img";
                let div = document.createElement("div");
                div.className = massage_class + "_div";
                div.style.top = top;
                div.style.left = left;
                document.getElementById(e.detail.year).appendChild(div);
                div.appendChild(img);
                remove_divs.push({parent: document.getElementById(e.detail.year), son: div});
            });

            document.addEventListener("remove_divs", () => {
                for(let i = remove_divs.length - 1; i >= 0; i--){
                    remove_divs[i].parent.removeChild(remove_divs[i].son);
                    remove_divs.pop();
                }
            });

            document.getElementById("glass7").addEventListener("win_glass", () => {
                glass7_flag = false;
                document.getElementById("glass7").className = "glass DISAPPEAR";
                setTimeout(() => {
                    document.getElementById("seventh_year").removeChild(document.getElementById("glass7"));
                    add_text_bubble({text: "הטורח בערב שבת, יאכל בשבת!", id: "MB3", class: "mouse", kind: 3, img: "מסודר/SH 030 c.png"}, document.getElementById("seventh_year"));
                    setTimeout(() => {
                        remove_text_bubble({id: "MB3"}, document.getElementById("seventh_year"));
                    }, 6000);
                }, 1000);
                document.getElementById("PI7").src = "מסודר/SH 008 a.png";
                document.getElementById("seventh_year").dispatchEvent(new CustomEvent("first_stage", {detail: {name: "glass"}}));
            });

            var first_stage_indicator = 0;
            document.getElementById("seventh_year").addEventListener("first_stage", (e) => {
                document.getElementById("WI7").src = "מסודר/SH 006 " + (++first_stage_indicator === 1 ? "c" : "e") + ".png";
                document.getElementById("TVS7").src = "מסודר/מסך טלוויזיה/SH 039 " + (first_stage_indicator === 1 ? "b" : "c") + ".png";
                document.getElementById("television7").onclick = () => {
                    document.dispatchEvent(new CustomEvent("show_title", {detail:{src: document.getElementById("TVS7").src, className: "title_slide_down_geo", next_game_event: new Event("setup_seventh_agri")}}));
                    document.getElementById("television7").onclick = null;
                };
            });
            document.addEventListener("setup_seventh_agri", () => {
                if(first_stage_indicator === 2){
                    document.getElementById("inner_tv7").style.display = "block";
                }
                if(first_stage_indicator === 2){
                    document.getElementById("remote7").onclick = () => {
                        document.getElementById("inner_tv7").style.display = "none";
                        document.getElementById("TVS7").src = "מסודר/מסך טלוויזיה/SH 037 small.png";
                        document.getElementById("remote7").onclick = null;
                        start_agriculture_seventh_year();
                    };
                }
            });

            var finishers = [];
            var sixth_goals = ["glass6", "tenth"];
            var sixth_year_finish_flag = false;

            document.addEventListener("check_for_finish", (e) => {
                finishers.push(e.detail.finish);
                for(let i = 0; i < sixth_goals.length; i++){
                    let finish_flag = false;
                    for(let j = 0; j < finishers.length; j++){
                        if(finishers[j] === sixth_goals[i]){
                            finish_flag = true;
                        }
                    }
                    if(!finish_flag){
                        return;
                    }
                }
                sixth_year_finish_flag = true;
            });

            document.addEventListener("setup_hefker_game", () => {
                setup();
                document.getElementById("window_Y7").onmouseover = () => {
                    document.getElementById("window_Y7").style.cursor = "pointer";
                }
            });
            document.getElementById("seventh_year").addEventListener("set_sabbath", () => {
                let sabbath_start_event = new Event("sabbath_game_start");
                /*
                    div.sidur{
                        top: 260px;
                        left: 559px;
                        width: 30px;
                        height: 44px;
                    }

                    div.mirror{
                        width: 80px;
                        height: 145px;
                        top: 256px;
                        left: 454px;
                    }

                    div.mirror_inner{
                        width: 74px;
                        height: 139px;
                        top: 3px;
                        left: 3px;
                        overflow: hidden;
                    }
                */
                drag_and_goal(document.getElementById("sidur7"), 44, 30, {x: 457, y: 259}, {x: 531, y: 398}, sabbath_start_event);
            });
            document.getElementById("sidur7").addEventListener("sabbath_game_start", () => {
                document.getElementById("title_img").style.transform = "rotateY(180deg)";
                document.dispatchEvent(new CustomEvent("show_title", {detail:{src: "מסודר/SH 031 b.png", className: "title_slide_down_sidur", next_game_event: new Event("start_sabbath_game")}}));
            });
            var shabbat_can_play = true;
            document.addEventListener("start_sabbath_game", () => {
                if(shabbat_can_play){
                    shabbat_can_play = false;
                }
                mirror6_shown = false;
                mirror7_shown = false;
                document.getElementById("shabbat_game").style.display = "block";
                games_div.style.display = "block";
                games_div.className = "games_div blow_up";
            });

            document.addEventListener("setup_babushka", () => {
                document.getElementById("CLI7").src = "מסודר/SH 017 b.png";
                document.getElementById("clock7").onmouseover = () => {
                    document.getElementById("clock7").style.transform = "scale(2)";
                    add_text_bubble({text: "הגיע הזמן להסתכל פנימה!", id: "MB3", class: "mouse", kind: 3, img: "מסודר/SH 030 c.png"}, document.getElementById("seventh_year"));
                }
                document.getElementById("clock7").onmouseleave = () => {
                    document.getElementById("clock7").style.transform = "scale(1)";
                    remove_text_bubble({id: "MB3"}, document.getElementById("seventh_year"));
                }
                document.getElementById("babushka7").onmouseover = () => {
                    document.getElementById("babushka7").style.cursor = "pointer";
                }
                document.getElementById("babushka7").onmouseleave = () => {
                    document.getElementById("babushka7").style.cursor = "auto";
                }
                document.getElementById("babushka7").onclick = () => {
                    document.getElementById("babushka_game").style.display = "block";
                    document.getElementById("games_div").style.display = "block";
                    document.getElementById("games_div").className = "games_div blow_up";
                };
            });

            document.addEventListener("Israel_end", () => {
                document.getElementById("code_door_div").style.display = "block";
                document.getElementById("mirror7").style.cursor = "auto";
                document.getElementById("mirror7").onclick = null;
            });


            var inter_water_drop;
            glass6_win = new Event("glass6_win");
            let glass6 = document.getElementById("glass6");
            /*
                        ---- calculation data
                div.glass{
                    width: 20px;
                }
                div#glass6{
                    top: 390px;
                    left: 390px;
                }
                div#glass7{
                    top: 265px;
                    left: 830px;
                }
            */
            glass6.onmouseover = () => {
                add_text_bubble({text: "כדאי לשמור ולאגור, כדי להשתמש בשנה השביעית!", id: "BB1", class: "bird", kind: 1, img: "מסודר/SH 030 a.png"}, document.getElementById("sixth_year"));
            }

            glass6.onmouseleave = () => {
                remove_text_bubble({id: "BB1"}, document.getElementById("sixth_year"));
            }

            drag_and_goal(glass6, 36, 20, {x: 830, y: 265}, {x: 850, y: 301}, glass6_win);
            glass6.addEventListener("glass6_win", () => {
                glass6.onmousedown = null;
                glass6.onmouseover = null;
                glass6.onmouseleave = () => {
                    remove_text_bubble({id: "BB1"}, document.getElementById("sixth_year"));
                    glass6.onmouseleave = null;
                }
                let GI6 = document.getElementById("GI6");
                glass6.style.top = "265px";
                glass6.style.left = "830px";
                setTimeout(() => {
                    GI6.src = "./מסודר/SH 011 b.png";
                }, 3500);
                setTimeout(() => {
                    GI6.src = "./מסודר/SH 011 c.png";
                    clearInterval(inter_water_drop);
                    document.dispatchEvent(new CustomEvent("check_for_finish", {detail: {finish: "glass6"}}));
                    setTimeout(() => {
                        document.getElementById("title_div").style.display = "none";
                        if(sixth_year_finish_flag){
                            document.getElementById("sixth_year").style.display = "none";
                            //document.getElementById("seventh_year").style.display = "block";
                            change_phone();
                            mirror6_shown = false;
                            mirror7_shown = true;
                            sixth_year_finish_flag = false;
                            alarm7_interval = setInterval(alarm_interval, 500);
                        }
                    }, 2000);
                }, 8000);
            });