// this file is required for bulma navbar burgers to work on smaller screens

$(document).ready(() => {

    // get 
    const navburgers = Array.prototype.slice.call($('.navbar-burger'), 0);
    navburgers.forEach(el => {
        el.onclick = () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        };
    });
});