$(document).ready(function () {
    const flowerEmojis = ['🌼', '🌸', '🌻', '🌷'];
    const flowerSize = 45;
    const $container = $('body');
    const $bee = $('#bee');
    const flowersData = [];

    function createFlower() {
        const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        const $flower = $('<div class="flower"></div>');
        $flower.text(emoji);
        $flower.css({
            position: 'absolute',
            width: flowerSize + 'px',
            height: flowerSize + 'px',
            fontSize: '45px',
            userSelect: 'none',
            pointerEvents: 'none',
        });
        $container.append($flower);

        const x = Math.random() * (window.innerWidth - flowerSize);
        const y = Math.random() * ($(document).height() - flowerSize);
        const dx = (Math.random() - 0.5) * 4.5;
        const dy = (Math.random() - 0.5) * 4.5;

        $flower.css({ left: x + 'px', top: y + 'px' });

        flowersData.push({ $el: $flower, x, y, dx, dy, visible: true });
    }

    function respawnFlower(flower) {
        flower.x = Math.random() * (window.innerWidth - flowerSize);
        flower.y = Math.random() * ($(document).height() - flowerSize);
        flower.dx = (Math.random() - 0.5) * 4.5;
        flower.dy = (Math.random() - 0.5) * 4.5;
        flower.$el.css({ left: flower.x + 'px', top: flower.y + 'px' }).show();
        flower.visible = true;
    }

    function updateFlowers() {
        flowersData.forEach(flower => {
            if (!flower.visible) return;

            flower.x += flower.dx;
            flower.y += flower.dy;

            if (flower.x < 0 || flower.x > window.innerWidth - flowerSize) {
                flower.dx *= -1;
                flower.x = Math.max(0, Math.min(flower.x, window.innerWidth - flowerSize));
            }

            if (flower.y < 0 || flower.y > $(document).height() - flowerSize) {
                flower.dy *= -1;
                flower.y = Math.max(0, Math.min(flower.y, $(document).height() - flowerSize));
            }

            flower.$el.css({ left: flower.x + 'px', top: flower.y + 'px' });

            const beeRect = $bee[0].getBoundingClientRect();
            const flowerRect = flower.$el[0].getBoundingClientRect();

            const intersect = !(
                beeRect.right < flowerRect.left ||
                beeRect.left > flowerRect.right ||
                beeRect.bottom < flowerRect.top ||
                beeRect.top > flowerRect.bottom
            );

            if (intersect) {
                flower.$el.hide();
                flower.visible = false;
                setTimeout(() => {
                    respawnFlower(flower);
                }, 2000);
            }
        });

        requestAnimationFrame(updateFlowers);
    }

    // Spawn initial
    for (let i = 0; i < 10; i++) {
        createFlower();
    }

    // Spawn continu
    setInterval(() => {
        createFlower();
    }, 5000);

    // Déplacement de l'abeille
    $(document).on('mousemove', function (e) {
        $bee.css({
            left: (e.clientX - 30) + 'px',
            top: (e.clientY - 30) + 'px'
        });
    });

    updateFlowers();
});

