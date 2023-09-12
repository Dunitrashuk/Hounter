export default function articles() {
  //SELECTORS
  const articlesContainer = document.querySelector(
    ".find-more__articles-container__articles"
  );
  const mainArticleContainer = document.querySelector(
    ".find-more__articles-container__main-article"
  );

  const moreButton = document.querySelector(".find-more-button");

  let articles = [
    {
      imageUrl: "./assets/images/house-9.jpg",
      user: {
        avatar: "./assets/images/user-3.jpg",
        name: "Dianne Russell",
      },
      title: "The things we need to check when we want to buy a house",
      description:
        "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
      readTime: "4",
      date: "25 Apr 2021",
    },

    {
      imageUrl: "./assets/images/house-10.jpg",
      user: {
        avatar: "./assets/images/user-4.jpg",
        name: "Courtney Henry",
      },
      title: "7 Ways to distinguish the quality of the house we want to buy",
      description:
        "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
      readTime: "6",
      date: "22 Apr 2021",
    },

    {
      imageUrl: "./assets/images/house-7.jpg",
      user: {
        avatar: "./assets/images/user-5.jpg",
        name: "Darlene Robertson",
      },
      title: "The best way to know the quality of the house we want to buy",
      description:
        "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
      readTime: "2",
      date: "20 Mar 2021",
    },
  ];

  let mainArticle = {
    imageUrl: "./assets/images/hero-card-house.jpg",
    user: {
      avatar: "./assets/images/user-2.jpg",
      name: "Cameron Williamson",
    },
    title: "12 Things to know before buying a house",
    description:
      "Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house",
    readTime: "8",
    date: "27 Apr 2021",
  };

  //FUNCTIONS
  function renderArticlesMarkup(articlesMarkup) {
    articlesContainer.innerHTML += articlesMarkup;
  }

  function renderMainArticleMarkup(articleMarkup) {
    mainArticleContainer.innerHTML = "";
    mainArticleContainer.innerHTML += articleMarkup;
  }

  function generateArticlesMarkup(articles) {
    articles.forEach((article, idx) => {
      let template = `
      <div class="mini-article">
        <div class="mini-article__img-container">
            <img src="${article.imageUrl}" alt="article ${idx}" />
        </div>

        <div class="mini-article__info">
            <div class="mini-article__info__user">
                <div class="mini-article__info__user__img-container">
                    <img src="${article.user.avatar}" alt="" />
                </div>

                <p class="label-text-regular">${article.user.name}</p>
            </div>
            <h3 class="subtitle">
                ${article.title}
            </h3>

            <div class="mini-article__info__date">
                <svg>
                    <use href="./assets/svgs/sprite.svg#time"></use>
                </svg>

                 <div class="mini-article__info__date__text">
                    <p class="label-text-regular text-grey-2">
                        ${article.readTime} min read | ${article.date}
                    </p>
                </div>
            </div>
            </div>
        </div>
      `;
      renderArticlesMarkup(template);
    });
    addArticlesEvents();
  }

  function generateMainArticleMarkup(article) {
    let template = `
      <div class="article">
      <div class="article__img-container">
        <img src="${article.imageUrl}" alt="main article img" />
      </div>

      <div class="mini-article__info__user">
        <div class="mini-article__info__user__img-container">
          <img src="${article.user.avatar}" alt="main article user img" />
        </div>

        <p class="label-text-regular">${article.user.name}</p>
      </div>

      <h3 class="heading-3">${article.title}</h3>
      <p class="body-text-light text-grey-2">
        ${article.description}
      </p>

      <div class="mini-article__info__date__text">
        <p class="label-text-regular text-grey-2">
          ${article.readTime} min read | ${article.date}
        </p>
      </div>
    </div>
      `;
    renderMainArticleMarkup(template);
  }

  function changeArticle(idx) {
    const article = articles[idx];

    articles.splice(idx, 1);
    articles.push(mainArticle);

    mainArticle = article;

    articlesContainer.innerHTML = "";
    generateArticlesMarkup(articles);
    generateMainArticleMarkup(article);
  }

  function addMoreArticles() {
    articles.push(...articles);
    articlesContainer.innerHTML = "";
    generateArticlesMarkup(articles);
  }

  generateArticlesMarkup(articles);
  generateMainArticleMarkup(mainArticle);

  //EVENTS
  function addArticlesEvents() {
    const articlesEl = document.querySelectorAll(".mini-article");
    articlesEl.forEach((article, idx) => {
      article.addEventListener("click", (e) => {
        changeArticle(idx);
      });
    });
  }

  moreButton.addEventListener("click", addMoreArticles, { once: true });
}
