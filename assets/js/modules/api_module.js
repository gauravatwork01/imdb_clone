class api_cl {
    static api_key = "355dd3d9";

    static async get_imdb_item_by_id(imdb_id) {
        let resp = await fetch(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${api_cl.api_key}`);
        let res = await resp.json();
        return res;
    }

    static async get_results_by_search_string(str) {
        let url = `http://www.omdbapi.com/?s=${str}&apikey=${api_cl.api_key}`
        // console.log(url)
        let resp = await fetch(url);
        let res = await resp.json();
        return res;
    }
    static async get_results_by_search_string_page_num(str, page_num) {
        let url = `http://www.omdbapi.com/?s=${str}&apikey=${api_cl.api_key}&page=${page_num}`
        console.log("url hit is", url)
        let resp = await fetch(url);
        let res = await resp.json();
        return res;
    }
}

export { api_cl };