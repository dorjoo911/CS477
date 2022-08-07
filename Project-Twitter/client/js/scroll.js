(function () {
  const quotesEl = document.querySelector(".quotes");
  const loaderEl = document.querySelector(".loader");

  const token = sessionStorage.getItem("accessToken");
  const userData = parseJwt(token);

  // get the quotes from API
  const getQuotes = async (myUsername, page, limit) => {
    // const API_URL = `https://localhost:3000/tweets/?page=${page}&limit=${limit}`;
    const API_URL = `http://localhost:3000/tweets/${myUsername}`;
    const response = await fetch(API_URL);
    // handle 404
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
  };

  // show the quotes  <span>${quote.username})</span>
  const showQuotes = (quotes) => {
    console.log(quotes);
    quotes.forEach((quote) => {
      const quoteEl = document.createElement("blockquote");
      quoteEl.classList.add("quote");

      quoteEl.innerHTML = `
      <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex flex-start">
          <!--insert photo link -->
          <img
            class="rounded-circle shadow-1-strong me-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyr058kmJ9mzBDDkRlLTr-HSYCoJkA0DHG9w&usqp=CAU"
            alt="avatar"
            width="40"
            height="40"
          />
          <div class="w-100">
            <div
              class="d-flex justify-content-between align-items-center mb-3"
            >
              <!--insert user name  and post body-->
              <h6 class="text-primary fw-bold mb-0">
              ${quote.username}
                <span class="text-dark ms-2"
                  >${quote.comment}</span
                >
              </h6>
              <!--insert date published-->
              <p class="mb-0">${quote.date}</p>
            </div>
            <div
              class="d-flex justify-content-between align-items-center"
            >
              <p class="small mb-0" style="color: #aaa">
                <a href="#!" class="link-grey">Like</a> •
                <a href="#!" class="link-grey">Dislike</a> •
              </p>
              <div class="d-flex flex-row">
                <i class="fas fa-star text-warning me-2"></i>
                <i class="far fa-check-circle" style="color: #aaa"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            
            <footer></footer>
        `;

      quotesEl.appendChild(quoteEl);
    });
  };

  const hideLoader = () => {
    loaderEl.classList.remove("show");
  };

  const showLoader = () => {
    loaderEl.classList.add("show");
  };

  const hasMoreQuotes = (page, limit, total) => {
    console.log(page + ", " + limit + ", " + total);
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  // load quotes
  const loadQuotes = async (page, limit) => {
    // show the loader
    showLoader();

    // 0.5 second later
    setTimeout(async () => {
      try {
        // if having more quotes to fetch
        if (hasMoreQuotes(page, limit, total)) {
          // call the API to get quotes
          const response = await getQuotes(userData.username, page, limit);
          // show quotes
          showQuotes(response);
          // update the total
          //total = total + response.length;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 1000);
  };

  // control variables
  let currentPage = 1;
  const limit = 10;
  let total = 32;

  window.addEventListener(
    "scroll",
    () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        hasMoreQuotes(currentPage, limit, total)
      ) {
        currentPage++;
        console.log(currentPage);
        loadQuotes(currentPage, limit);
      }
    },
    {
      passive: false,
    }
  );

  // initialize
  loadQuotes(currentPage, limit);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
})();
