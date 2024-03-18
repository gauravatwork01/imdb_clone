import { api_cl } from "./api_module.js";

class pagination_display {
    static remove_pagination_links() {
        let ul = document.querySelector("ul.imdb-items-pages");
        ul.innerHTML = "";
    }

    static hide_pagination() {
        document.querySelector(".imdb-items-pages-cont").style.visibility = "hidden";
    }

    static show_pagination() {
        document.querySelector(".imdb-items-pages-cont").style.visibility = "visible";
    }
}

class page_group {

    static deactivate_previous_page_links() {
        let old_active_page_items =
            document.querySelectorAll("li.imdb-items-page.active-page-item");
        for (let old_active_page_item of old_active_page_items) {
            old_active_page_item.classList.remove("active-page-item");
        }
    }

    static activate_new_page_links(page_group) {
        let page_items =
            document.querySelectorAll(`li.imdb-items-page[data-page-grp="${page_group}"]`);
        for (let page_item of page_items) {
            page_item.classList.add("active-page-item");
        }
    }

    static display_page_group_items(pg_group) {
        page_group.deactivate_previous_page_links();
        page_group.activate_new_page_links(pg_group);
    }
}

class active_page_events {
    static selected_page_event() {
        let page_btns = document.querySelectorAll("button.selected-page");
        for (let page_btn of page_btns) {
            page_btn.addEventListener("click", (e) => {
                page_btn.closest("label").click();
            });
        }
    }
}


class pagination_cl {
    search_str;

    constructor() {
        page_navigation_event.register_previous_btn_click_event();
        page_navigation_event.register_next_btn_click_event();
    }

    update_pagination(imdb_items_DI, search_str, result) {
        this.imdb_items_DI = imdb_items_DI;
        this.search_str = search_str;
        pagination_display.show_pagination();
        this.fill_pagination_items(result);
        page_group.display_page_group_items(1);
    }

    static pagination_item_get(page_num) {
        let new_li = document.createElement("li");
        new_li.classList.add("imdb-items-page");
        let page_grp = Math.ceil(page_num / 5);
        new_li.setAttribute("data-page-num", page_num);
        new_li.setAttribute("data-page-grp", page_grp);
        new_li.innerHTML = `<label for="page-${page_num}">
                                    <input type="radio" id="page-${page_num}" name="pages">
                                    <button class="selected-page">${page_num}</button>
                                </label>`;
        return new_li;
    }



    pagination_item_register_click_event(new_li, search_string) {
        let ul = document.querySelector(".imdb-items");
        new_li.addEventListener("click", (e) => {
            let page_num = new_li.getAttribute("data-page-num");
            api_cl.get_results_by_search_string_page_num(search_string, page_num).
                then((result) => {
                    ul.innerHTML = "";
                    // console.log("res obt is", result)
                    this.imdb_items_DI.populate_items(result);
                });
        });
    }

    fill_pagination_items(result) {
        let tot_pages = Math.ceil(Number(result.totalResults) / 10);
        let ul = document.querySelector("ul.imdb-items-pages");
        ul.setAttribute("data-page-group", 1);
        ul.innerHTML = "";
        let page_num = 1;
        while (page_num <= tot_pages) {
            let new_li = pagination_cl.pagination_item_get(page_num);
            ul.appendChild(new_li);

            this.pagination_item_register_click_event(new_li, this.search_str);
            page_num++;
        }
    }
}




class page_navigation_link {
    static disable_previous_btn() {
        let prev_page_el = document.querySelector(".previous-page");
        prev_page_el.disabled = true;
    }

    static enable_previous_btn() {
        let prev_page_el = document.querySelector(".previous-page");
        prev_page_el.disabled = false;
    }
}

class page_navigation_event {

    static register_previous_btn_click_event() {
        let prev_page_el = document.querySelector(".previous-page");
        prev_page_el.addEventListener("click", (e) => {
            let ul = document.querySelector("ul.imdb-items-pages");
            let curr_pg_grp = ul.getAttribute("data-page-group");

            if (curr_pg_grp == 1) {
                prev_page_el.disabled = true;
            } else {
                let new_pg_grp = Number(curr_pg_grp) - 1;
                page_group.display_page_group_items(new_pg_grp);
                ul.setAttribute("data-page-group", new_pg_grp);

                if (new_pg_grp == 1) {
                    page_navigation_link.disable_previous_btn();
                }
            }
        });
    }

    static register_next_btn_click_event() {
        document.querySelector(".next-page").addEventListener("click", (e) => {
            let ul = document.querySelector("ul.imdb-items-pages");
            let curr_pg_grp = ul.getAttribute("data-page-group");

            let new_pg_grp = Number(curr_pg_grp) + 1;
            console.log("new_pg_grp is", new_pg_grp);
            page_group.display_page_group_items(new_pg_grp);
            page_navigation_link.enable_previous_btn();
            ul.setAttribute("data-page-group", new_pg_grp);
        });
    }
}

export {
    pagination_display, pagination_cl, page_group,
    page_navigation_link, page_navigation_event
};
