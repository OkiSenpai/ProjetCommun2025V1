$(document).ready(function () {
    // Appliquer la classe invisible par défaut
    $("h2, h4").addClass("invisible");

    // Fonction qui vérifie la visibilité et applique les classes
    function checkVisibility() {
        $("h2, h4").each(function () {
            const element = $(this);
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            const offsetTop = element.offset().top;
            const offsetBottom = offsetTop + element.outerHeight();

            if (
                scrollTop + windowHeight > offsetTop + 100 &&
                scrollTop < offsetBottom - 100
            ) {
                element.addClass("texte-visible").removeClass("invisible");
            } else {
                element.removeClass("texte-visible").addClass("invisible");
            }
        });
    }

    // Vérifie au chargement de la page
    checkVisibility();

    // Vérifie à chaque scroll
    $(window).on("scroll", checkVisibility);





    $(window).on("scroll", function () {
        $(".snake-box").each(function (index) {
            const $el = $(this);
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            const offsetTop = $el.offset().top;

            if (scrollTop + windowHeight > offsetTop + 60) {
                setTimeout(function () {
                    $el.addClass("visible");
                }, index * 50);
            } else {
                $el.removeClass("visible");
            }
        });
    });
});

