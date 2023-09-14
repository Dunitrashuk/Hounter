export default function featuredCards() {
  const featuredButtons = document.querySelectorAll(".featured-button");
  const container = document.querySelector(".featured__cards");
  const leftButton = document.querySelector(
    ".featured__arrow-buttons-container"
  ).firstElementChild;
  const rightButton = document.querySelector(
    ".featured__arrow-buttons-container"
  ).lastElementChild;

  const houses = [
    {
      image: "./assets/images/house-1.jpg",
      title: "Roselands House",
      price: "$ 35.000.000",
      user: {
        avatar: "../../assets/images/user-5.jpg",
        name: "Dianne Russell",
        location: "Manchester, Kentucky",
      },
      type: "popular",
      propertyType: "Villa",
    },

    {
      image: "./assets/images/house-2.jpg",
      title: "Woodlandside",
      price: "$ 20.000.000",
      user: {
        avatar: "../../assets/images/user-6.jpg",
        name: "Robert Fox",
        location: "Dr. San Jose, South Dakota",
      },
      type: "new",
      propertyType: "House",
    },
    {
      image: "./assets/images/house-2.jpg",
      title: "Woodlandside",
      price: "$ 20.000.000",
      user: {
        avatar: "../../assets/images/user-6.jpg",
        name: "Robert Fox",
        location: "Dr. San Jose, South Dakota",
      },
      type: "new",
      propertyType: "House",
    },

    {
      image: "./assets/images/house-3.jpg",
      title: "The Old Lighthouse",
      price: "$ 44.000.000",
      user: {
        avatar: "../../assets/images/user-7.jpg",
        name: "Ronald Richards",
        location: "Santa Ana, Illinois",
      },
      type: "best",
      propertyType: "Apartment",
    },

    {
      image: "./assets/images/house-4.jpg",
      title: "Cosmo's House",
      price: "$ 22.000.000",
      user: {
        avatar: "../../assets/images/user-3.jpg",
        name: "Jenny Wilson",
        location: "Preston Rd. Inglewood, Maine 98380",
      },
      type: "popular",
      propertyType: "House",
    },

    {
      image: "./assets/images/house-5.jpg",
      title: "Lake's House",
      price: "$ 18.000.000",
      user: {
        avatar: "../../assets/images/user-1.jpg",
        name: "Jenny Wilson",
        location: "Preston Rd. Inglewood, Maine 98380",
      },
      type: "new",
      propertyType: "House",
    },

    {
      image: "./assets/images/house-6.jpg",
      title: "Florida Villa",
      price: "$ 54.000.000",
      user: {
        avatar: "../../assets/images/user-2.jpg",
        name: "Jenny Wilson",
        location: "Preston Rd. Inglewood, Maine 98380",
      },
      type: "best",
      propertyType: "Villa",
    },

    {
      image: "./assets/images/house-7.jpg",
      title: "Colorado House",
      price: "$ 21.000.000",
      user: {
        avatar: "../../assets/images/user-3.jpg",
        name: "Jenny Wilson",
        location: "Preston Rd. Inglewood, Maine 98380",
      },
      type: "popular",
      propertyType: "Apartment",
    },
  ];

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
      <div class="featured-card">
            <div class="featured-card__img-container">
              <img src="${card.image}" alt="house ${idx}">

              <div class="heart-container">
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
                  <img src="${card.user.avatar}" alt="user ${
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
      let filteredHouses = houses.filter(
        (house) => house.propertyType === type
      );
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

  function addFavoriteButtonsHandlers() {
    const favoriteButtons = document.querySelectorAll(".heart-container");
    favoriteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const buttonEl = e.target.closest(".heart-container");
        buttonEl.classList.toggle("favorite-active");
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
