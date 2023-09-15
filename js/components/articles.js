export default async function articles() {
  //SELECTORS
  const articlesContainer = document.querySelector(
    ".find-more__articles-container__articles"
  );
  const mainArticleContainer = document.querySelector(
    ".find-more__articles-container__main-article"
  );

  const moreButton = document.querySelector(".find-more-button");

  let articles = await fetchArticles();
  let mainArticle = await fetchMainArticle();

  //FUNCTIONS
  async function fetchArticles() {
    try {
      const response = await fetch("http://localhost:3000/articles");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchMainArticle() {
    try {
      const response = await fetch(
        "http://localhost:3000/articles/mainArticle"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
            <img src="http://localhost:8080${article.imageUrl}" alt="article ${idx}" />
        </div>

        <div class="mini-article__info">
            <div class="mini-article__info__user">
                <div class="mini-article__info__user__img-container">
                    <img src="http://localhost:8080${article.user.avatar}" alt="" />
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
        <img src="http://localhost:8080${article.imageUrl}" alt="main article img" />
      </div>

      <div class="mini-article__info__user">
        <div class="mini-article__info__user__img-container">
          <img src="http://localhost:8080${article.user.avatar}" alt="main article user img" />
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
