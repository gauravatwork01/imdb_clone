
class local_storage {

    static get_count(variable) {
        let cnt;
        if (localStorage[variable] === undefined) {
            cnt = 0;
        } else if (localStorage[variable] !== undefined) {
            cnt = JSON.parse(localStorage[variable]).length;
        }

        return cnt;
    }

    static put_item(variable, data) {
        localStorage.setItem(variable, JSON.stringify(data));
    }

    static get_item(variable) {
        let data;
        if (localStorage[variable] !== undefined) {
            data = localStorage[variable];
            data = JSON.parse(data);
        } else {
            data = [];
        }
        return data;
    }

}

class fav_count_cl {

    static update_fav_count() {
        document.querySelector(".fav-cnt").textContent = local_storage.get_count("favourites");
    }
}


class fav_click_events_cl {
    static list_all() {
        let btn = document.querySelector("button.fav-btn");
        btn.addEventListener("click", (e) => {
            window.location = "favourites.html";
        });
    }
    static item_add(btn, fav_item_info) {
        btn.addEventListener("click", (e) => {
            btn.disabled = true;

            let data = local_storage.get_item("favourites");
            data.push(fav_item_info);
            local_storage.put_item("favourites", data);

            fav_count_cl.update_fav_count();
        });
    }

    static item_remove(btn) {
        btn.addEventListener("click", (e) => {
            let parent_li = btn.closest("li");
            let imdb_id = parent_li.getAttribute("data-imdb-id");

            let data = local_storage.get_item("favourites");
            for (let d of data) {
                if (d.imdb_id == imdb_id) {
                    data.splice(data.indexOf(d), 1);
                    break;
                }
            }
            local_storage.put_item("favourites", data);
            parent_li.remove();
        });
    }
}


class fav_cl {
    constructor() {
        fav_count_cl.update_fav_count();
        fav_click_events_cl.list_all();
    }


    static populate_favs() {
        let favs = local_storage.get_item("favourites");
        if (favs !== undefined) {
            let fav_ul = document.querySelector("ul.fav-items");

            for (let fav of favs) {
                let new_li = document.createElement("li");
                new_li.classList.add("fav-item");
                new_li.setAttribute("data-imdb-id", fav.imdb_id);
                new_li.innerHTML = `<div class="item-card">
                                        <div class="item-image">
                                        </div>
                                        <div class="item-det">
                                            <div class="det-1">
                                                <div>
                                                    <h3 class="fav-item-name">${fav.title}</h3>
                                                    <span class="fav-item-year">${fav.year}</span>
                                                </div>
                                                <button class="remove-fav">Remove</button>
                                            </div>
                                            <div class="summ">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quod, libero adipisci omnis
                                                quisquam ex nemo ipsum tempore voluptatem fugiat!
                                            </div>
                                        </div>
                                    </div>`;

                fav_ul.appendChild(new_li);
                new_li.querySelector(".item-image").style.backgroundImage = `url("${fav.poster}")`;
                fav_click_events_cl.item_remove(new_li.querySelector("button.remove-fav"));
            }
        }
    }
}

export { fav_cl, fav_click_events_cl, fav_count_cl };
