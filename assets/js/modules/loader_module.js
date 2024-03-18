

class loader_cl {
    static display_msg(msg) {
        document.querySelector(".loader").style.visibility = "hidden";
        let pre_loader_txt = document.querySelector(".pre-loader-text");
        pre_loader_txt.innerHTML = msg;
        pre_loader_txt.style.visibility = "visible";
    }

    static display_loader() {
        document.querySelector(".loader").style.visibility = "visible";
        document.querySelector(".pre-loader-text").style.visibility = "hidden";
    }

    static display_nothing() {
        document.querySelector(".loader").style.visibility = "hidden";
        document.querySelector(".pre-loader-text").style.visibility = "hidden";
    }
}

export { loader_cl };