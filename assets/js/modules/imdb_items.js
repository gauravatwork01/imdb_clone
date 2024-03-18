
class imdb_items_body_cl {

    constructor(fav_click_events_cl_DI) {
        this.fav_click_events_cl_DI = fav_click_events_cl_DI;
    }

    static clear_searched_items() {
        let ul = document.querySelector("ul.imdb-items");
        ul.innerHTML = "";
    }

    static register_click_event_on_item(new_li, imdb_id) {

        new_li.addEventListener("click", (e) => {
            localStorage.setItem("imdb_id", imdb_id);
            window.location = "movie.html";
        });

    }


    static create_item(res) {
        let new_li = document.createElement("li");
        new_li.classList.add("imdb-item-card");
        new_li.innerHTML = `
                    <div class="click-area">
                        
                        <div class="imdb-item-poster" style='background-image: url("${res.Poster}")'>
                        </div>
                        
                        <h4 class="imdb-item-det">
                            <span class="imdb-item-name ">${res.Title}</span>
                            <span class="imdb-item-year">${res.Year}</span>
                        </h4>
                    </div>
                    <button class="imdb-item-fav">
                        <svg class="heart-1" viewBox="0 0 32 29.6">
                            <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                              c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
                        </svg>
                        <span class="fav-text">Add to favourite</span>
                    </button>`;
        return new_li;
    }

    populate_items(result) {
        let ul = document.querySelector("ul.imdb-items");
        ul.innerHTML = "";
        for (let res of result.Search) {

            let new_li = imdb_items_body_cl.create_item(res);
            ul.appendChild(new_li);
            imdb_items_body_cl.register_click_event_on_item(new_li.querySelector(".click-area"), res.imdbID);

            let fav_item_info = {
                title: res.Title,
                year: res.Year,
                poster: res.Poster,
                imdb_id: res.imdbID
            }
            this.fav_click_events_cl_DI.item_add(new_li.querySelector("button.imdb-item-fav"), fav_item_info);

        }
    }

}


export { imdb_items_body_cl };