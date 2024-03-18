

class update_mov_det {
    data;

    constructor(data) {
        this.data = data;
        this.update_movie_basic_details();
        this.update_ratings();
        this.update_poster();
        this.update_genres();
        this.update_summary();
        this.update_directors();
        this.update_writers();
        this.update_stars();
    }

    update_movie_basic_details() {
        document.querySelector(".mov-det-header").textContent = this.data.Title;
        document.querySelector(".movie-year").textContent = this.data.Year;
        document.querySelector(".movie-duration").textContent = this.data.Runtime;
    }

    update_ratings() {
        let ul = document.querySelector("ul.movie-ratings");
        ul.innerHTML = "";

        for (let rating of this.data.Ratings) {
            let new_li = document.createElement("li");
            new_li.classList.add("rating-item");
            new_li.innerHTML = `<p class="movie-rater">${rating.Source}</p>
                                <p class="movie-rating-val">${rating.Value}</p>`;

            ul.appendChild(new_li);
        }
    }

    update_poster() {
        document.querySelector(".poster").style.backgroundImage = `url("${this.data.Poster}")`;
    }

    update_genres() {
        let ul = document.querySelector("ul.movie-genres");
        ul.innerHTML = "";

        let genres = this.data.Genre.split(",");

        for (let genre of genres) {
            let new_li = document.createElement("li");
            new_li.classList.add("movie-genre-item");
            new_li.textContent = genre;

            ul.appendChild(new_li);
        }
    }

    update_directors() {
        let ul = document.querySelector("ul.all-directors");
        ul.innerHTML = "";

        let directors = this.data.Director.split(",");

        for (let director of directors) {
            let new_li = document.createElement("li");
            new_li.textContent = director;

            ul.appendChild(new_li);
        }
    }

    update_stars() {
        let ul = document.querySelector("ul.all-stars");
        ul.innerHTML = "";

        let stars = this.data.Actors.split(",");

        for (let star of stars) {
            let new_li = document.createElement("li");
            new_li.textContent = star;

            ul.appendChild(new_li);
        }
    }

    update_writers() {
        let ul = document.querySelector("ul.all-writers");
        ul.innerHTML = "";

        let writers = this.data.Writer.split(",");

        for (let writer of writers) {
            let new_li = document.createElement("li");
            new_li.textContent = writer;

            ul.appendChild(new_li);
        }
    }

    update_summary() {
        document.querySelector(".summary").textContent = this.data.Plot;
    }
}

export { update_mov_det };
