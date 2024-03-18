
import { api_cl } from "./api_module.js";


class new_movies_position {
    static get_current_transform_x(ul) {
        let trans_val = window.getComputedStyle(ul).getPropertyValue('transform');
        trans_val = trans_val.replace("matrix(", "");
        trans_val = trans_val.replace(")", "");
        trans_val = trans_val.split(",");
        let res = 0;
        if (trans_val[0] == "none") {

        } else {
            let old_transform_x = Number(trans_val[4].trim());

            if (old_transform_x > -5) {

            } else {
                res = old_transform_x;
            }

        }
        return res;
    }
}

class new_movies_navigation_events {

    static register_next_navig_event() {
        let ul = document.querySelector("ul.new-movies-list");
        let next_el = document.querySelector(".next-movies");
        next_el.addEventListener("click", (e) => {
            let cont = document.querySelector(".new-movies-list-cont");
            let cont_det = cont.getBoundingClientRect();

            let old_transform_x = new_movies_position.get_current_transform_x(ul);
            let new_transform_x = old_transform_x - cont_det.width;

            let val = ul.offsetWidth + new_transform_x;
            console.log(new_transform_x, "&&&&", ul.offsetWidth, "$$$$", val);
            if (val >= 10) {

                let txt = `translate(${new_transform_x}px)`
                ul.style.transform = txt;
            }
        });
    }

    static register_prev_navig_event() {
        let ul = document.querySelector("ul.new-movies-list");
        let prev_el = document.querySelector(".previous-movies");
        prev_el.addEventListener("click", (e) => {
            let cont = document.querySelector(".new-movies-list-cont");
            let cont_det = cont.getBoundingClientRect();

            let old_transform_x = new_movies_position.get_current_transform_x(ul);
            console.log(old_transform_x);
            if (old_transform_x == 0) {

            } else {

                let new_transform_x = old_transform_x + cont_det.width;
                if (new_transform_x <= 5) {

                    let txt = `translate(${new_transform_x}px)`
                    ul.style.transform = txt;
                }
            }
        });
    }
}



class new_movies_cl {

    constructor() {
        new_movies_navigation_events.register_next_navig_event();
        new_movies_navigation_events.register_prev_navig_event();
        this.fill_new_movies();
    }

    fill_new_movies() {
        api_cl.get_results_by_search_string("iron").then((result) => {
            console.log(result);

            let ul = document.querySelector("ul.new-movies-list");
            for (let res of result.Search) {
                let new_li = document.createElement("li");
                new_li.classList.add("item-card");

                new_li.innerHTML = `<div class="img-cont"></div>
                <p class="title">${res.Title}</p>
                <p class="summary">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae cumque dolores rem
                            necessitatibus impedit molestiae praesentium eum beatae earum vel?
                </p>

                <button class="cont-reading">Continue reading</button>`;

                ul.appendChild(new_li);

                new_li.querySelector(".img-cont").style.backgroundImage =
                    `url("${res.Poster}")`
            }
        });
    }
}

export { new_movies_cl };