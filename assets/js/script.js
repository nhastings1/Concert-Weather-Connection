document.body.style.overflow = 'hidden';

function scrolldown() {
    setTimeout(
        function () {
            window.scrollTo(0, document.body.scrollHeight);
            scrolldown();
        }, 2000
    )
}

scrolldown()