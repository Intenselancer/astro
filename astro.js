fetch("./details.json")
    .then((response) => response.json())
    .then((data) => {
        createDetails(data)
        console.log(data)
    })
    .catch((error) => console.error("Error reading json file", error));

function createDetails(data) {
    const bsLeft = document.querySelector(".bs-left");
    const bsRight = document.querySelector(".bs-content-side");

    // Accessing fields and storing and varaibles
    const images = data?.imagesUrl ?? "";
    const bigImage = images[0];
    const remainingImages = images.slice(0, 6);

    bsLeft.innerHTML = ``;

    bsRight.innerHTML = ``;


    const moreButton = bsLeft.querySelector('.bs-more');
    const overlay = document.querySelector('.bs-overlay');
    const bigImageOverlay = document.querySelector('.bs-overlay-main-image img');
    const overlayThumbnails = document.querySelector('.bs-overlay-thumbnails');
    const closeButton = document.querySelector('.bs-close-btn');
    const leftArrow = document.querySelector('.bs-left-arrow');
    const rightArrow = document.querySelector('.bs-right-arrow');

    function updateBigImage(index) {
        bigImageOverlay.src = images[index];
    }

    moreButton.addEventListener('click', () => {

        overlay.classList.remove('bs-hidden');
        currentIndex = 0;
        updateBigImage(currentIndex);

        overlayThumbnails.innerHTML = images
            .map((image, idx) => `<img src="${image}" alt="Thumbnail Image" data-index="${idx}">`)
            .join('');

        overlayThumbnails.querySelectorAll('img').forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                currentIndex = Number(e.target.dataset.index);
                updateBigImage(currentIndex);
            });
        });
    });

    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        updateBigImage(currentIndex);
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        updateBigImage(currentIndex);
    });

    closeButton.addEventListener('click', () => {
        overlay.classList.add('bs-hidden');
    });
}

