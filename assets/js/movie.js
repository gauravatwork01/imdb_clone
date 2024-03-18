import { api_cl } from "./modules/api_module.js";
import { update_mov_det } from "./modules/movie_card.js";


if (localStorage.imdb_id !== undefined) {

    console.log("here 2");

    api_cl.get_imdb_item_by_id(localStorage.imdb_id).then((res) => {
        console.log(res);
        new update_mov_det(res);

        // document.querySelector(".movies-list").style.display = "none";
        // document.querySelector(".movie-card-section").style.display = "block";

        // document.querySelector(".search-text").value = "";

        // imdb_items_body_cl.clear_searched_items();

        // pagination_display.remove_pagination_links();
        // pagination_display.hide_pagination();
    });
} else {
    console.log("here 3");
}
