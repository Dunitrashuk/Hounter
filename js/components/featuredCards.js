export default async function featuredCards() {
  const featuredButtons = document.querySelectorAll(".featured-button");
  const container = document.querySelector(".featured__cards");
  const leftButton = document.querySelector(
    ".featured__arrow-buttons-container"
  ).firstElementChild;
  const rightButton = document.querySelector(
    ".featured__arrow-buttons-container"
  ).lastElementChild;

  async function fetchFeaturedCards() {
    try {
      const response = await fetch(
        "http://localhost:3000/featured/featuredCards"
      ); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const houses = await fetchFeaturedCards();

  function allignCards() {
    const target = document.querySelector(".featured__container__subcontainer");
    const margin = target.getBoundingClientRect().x;
    container.firstElementChild.style.marginLeft = margin + "px";
  }

  function renderMarkup(cardMarkup) {
    container.innerHTML += cardMarkup;
    allignCards();
    addFavoriteButtonsHandlers();
  }

  function returnSVG(type) {
    if (type === "popular") return "fire";
    if (type === "new") return "house";
    if (type === "best") return "wallet";
  }

  function returnLabelText(type) {
    if (type === "popular") return "Popular";
    if (type === "new") return "New house";
    if (type === "best") return "Best deals";
  }

  function generateMarkup(cards) {
    cards.forEach((card, idx) => {
      let template = `
      <div class="featured-card" id="${card.id}">
            <div class="featured-card__img-container">
              <img src="http://127.0.0.1:8080/${card.image}" alt="house ${idx}">

              <div class="heart-container ${
                card.favorite ? "favorite-active" : ""
              }">
                <svg>
                    <use href="./assets/svgs/sprite.svg#heart"></use>
                </svg>
              </div>

              <div class="sticker sticker--${card.type} label-text-medium">
                <svg>
                  <use href="./assets/svgs/sprite.svg#${returnSVG(
                    card.type
                  )}"></use>
                </svg>
                ${returnLabelText(card.type)}
              </div>
            </div>

            <div class="featured-card__text-container">
              <h3 class="heading-3 u-margin-top-small-2">${card.title}</h3>
              <h4 class="heading-4 text-grey-3 u-margin-top-small">${
                card.price
              }</h4>

              <div class="featured-card__user-container u-margin-top-small-2">
                <div class="featured-card__user-container__img">
                  <img src="http://127.0.0.1:8080/${
                    card.user.avatar
                  }" alt="user ${
        card.user.avatar[card.user.avatar.length - 1]
      }">
                </div>

                <div class="featured-card__user-container__text">
                  <h5 class="subtitle">${card.user.name}</h5>
                  <p class="label-text-regular text-grey-2">${
                    card.user.location
                  }</p>
                </div>
              </div>
            </div>
          </div>
      `;
      renderMarkup(template);
    });
  }

  function filterHouses(houses, type = undefined) {
    if (type) {
      let filteredHouses;
      if (type === "Favorite") {
        filteredHouses = houses.filter((house) => house.favorite);
      } else {
        filteredHouses = houses.filter((house) => house.propertyType === type);
      }
      container.innerHTML = "";
      generateMarkup(filteredHouses);
    } else {
      container.innerHTML = "";
      generateMarkup(houses);
    }
  }

  function styleArrows() {
    const reachedLeft = container.scrollLeft === 0;
    const reachedRight =
      window.innerWidth + container.scrollLeft + 1 >= container.scrollWidth;

    if (reachedLeft && reachedRight) {
      leftButton.classList.remove("active-button");
      rightButton.classList.remove("active-button");
      return;
    }

    if (reachedLeft) {
      leftButton.classList.remove("active-button");
      rightButton.classList.add("active-button");
    } else if (reachedRight) {
      rightButton.classList.remove("active-button");
      leftButton.classList.add("active-button");
    } else {
      leftButton.classList.add("active-button");
      rightButton.classList.add("active-button");
    }
  }

  function changeFavorite(currentHouse) {
    houses.forEach((house) => {
      if (house.id === parseInt(currentHouse.id)) {
        house.favorite = !house.favorite;
        postFavoriteHouse(currentHouse.id);
      }
    });
  }

  async function postFavoriteHouse(id) {
    fetch(`http://localhost:3000/featured/featuredCards/${id}`, {
      method: "POST",
    });
  }

  function addFavoriteButtonsHandlers() {
    const favoriteButtons = document.querySelectorAll(".heart-container");
    favoriteButtons.forEach((button, idx) => {
      button.addEventListener("click", (e) => {
        const buttonEl = e.target.closest(".heart-container");
        const cardEl = e.target.closest(".featured-card");
        buttonEl.classList.toggle("favorite-active");
        changeFavorite(cardEl);
      });
    });
  }

  //EVENTS
  featuredButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const button = e.target.closest(".featured-button");
      const type = button.lastElementChild.textContent;

      featuredButtons.forEach((currButton) => {
        if (button !== currButton) currButton.classList.remove("active");
      });

      button.classList.toggle("active");
      if (button.classList.contains("active")) {
        filterHouses(houses, type);
      } else {
        filterHouses(houses);
      }

      styleArrows();
    });
  });

  rightButton.addEventListener("click", (e) => {
    container.scrollBy(408, 0);
  });

  leftButton.addEventListener("click", (e) => {
    container.scrollBy(-408, 0);
  });

  container.addEventListener("scroll", (e) => {
    styleArrows();
  });

  generateMarkup(houses);
}
