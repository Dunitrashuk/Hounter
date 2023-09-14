export default async function heroCards() {
  const cards = await fetchHeroCards();

  async function fetchHeroCards() {
    try {
      const response = await fetch("http://localhost:3000/hero/heroCards"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
                    src="http://127.0.0.1:8080/${imageURL}"
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
