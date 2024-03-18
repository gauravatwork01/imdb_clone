
import { api_cl } from "./modules/api_module.js";
import { loader_cl } from "./modules/loader_module.js";
import { imdb_items_body_cl } from "./modules/imdb_items.js";
import {
    pagination_display, pagination_cl, page_navigation_event
} from "./modules/pagination_module.js";
import { fav_cl, fav_click_events_cl, fav_count_cl } from "./modules/fav_module.js";
import { new_movies_cl } from "./modules/new_movies.js";


let new_movies = new new_movies_cl();
let favourite = new fav_cl();
let pagination = new pagination_cl();
let imdb_items = new imdb_items_body_cl(fav_click_events_cl);

let inp_el = document.querySelector("input.search-text");
inp_el.addEventListener("input", (e) => {

    document.querySelector(".movies-list").style.display = "block";

    if (inp_el.value === "") {
        imdb_items_body_cl.clear_searched_items();
        loader_cl.display_msg("Please type in to get the desired results !!!");
        pagination_display.remove_pagination_links();
        pagination_display.hide_pagination();
    } else if (inp_el.value !== "") {
        loader_cl.display_loader();
        api_cl.get_results_by_search_string(inp_el.value).then((result) => {
            if (result.Response == "False") {
                result.Search = [];
                imdb_items.populate_items(result);
                loader_cl.display_msg("No results found !!!");
                pagination_display.hide_pagination();
            } else {
                imdb_items.populate_items(result);
                pagination.update_pagination(imdb_items, inp_el.value, result);
                loader_cl.display_msg("");
            }
        });
    }
});

inp_el.addEventListener("keydown", (e) => {

    if (e.key == "ArrowDown") {
        document.querySelector('li.result-val').focus();
        document.querySelector('li.result-val').classList.add("hover");
    }

});
window.addEventListener("unload", (e) => {
    inp_el.value = "";
});
