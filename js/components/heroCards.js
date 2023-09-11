export default function heroCards() {
  const cards = [
    {
      images: [
        "./assets/images/user-1.jpg",
        "./assets/images/user-2.jpg",
        "./assets/images/user-3.jpg",
      ],
      title: "1K+ People",
      description: "Successfully Getting Home",
    },
    {
      images: ["./assets/images/hero-card-house.jpg"],
      title: "56 Houses",
      description: "Sold Monthly",
    },
    {
      images: ["./assets/images/user-4.jpg"],
      title: "4K+",
      description: "People Looking for New Homes",
    },
  ];

  function renderMarkup(cardMarkup) {
    const container = document.querySelector(".hero__content__cards-container");
    container.innerHTML += cardMarkup;
  }

  function generateMarkup(cards) {
    cards.forEach((card) => {
      let template = `
            <div class="hero-card">
                <div class="hero-card__images-container">
                  ${card.images.map((imageURL, idx) => {
                    return `
                    <img
                    src="${imageURL}"
                    alt="card image ${idx}"
                    class="hero-card__images-container__img"
                  />
                    `;
                  })}
                </div>
                <div class="hero-card__text-container">
                  <h3 class="body-text-bold">${card.title}</h3>
                  <p class="label-text-regular-sm text-grey-2">
                    ${card.description}
                  </p>
                </div>
              </div>
            `;
      renderMarkup(template);
    });
  }

  generateMarkup(cards);
}
