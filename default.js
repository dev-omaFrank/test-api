var page = 1,
    page_size = 10,
    key = 'd5bbe46fecc34e8da12128e33a447831',
    url = `https://newsapi.org/v2/everything?q=juice&sortBy=popularity&page=${page}&pageSize=${page_size}&apiKey=${key}`,
    totalItems = 100,
    total_pages = '',
    req = new Request(url);

function fetchArticles() {
    url = `https://newsapi.org/v2/everything?q=juice&sortBy=popularity&page=${page}&pageSize=${page_size}&apiKey=${key}`;
    req = new Request(url);
    fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
            switch (data.status) {
                case "ok":
                    let articlesHTML = '';
                    data.articles.forEach(article => {
                        if (article.author != null &&
                            article.title != '[Removed]' &&
                            article.description != '[Removed]' &&
                            article.content != '[Removed]'
                        ) {
                            totalItems = data.length;
                            var dateArr = article.publishedAt.split('T');
                            var date = dateArr[0]
                            articlesHTML += `
                        <article>
                        <div class="inside-article">
                            <header class="entry-header">
                                <!-- article title -->
                                <h2 class="entry-title" itemprop="headline"><a href="#">${article.title}</a></h2>
                                <div class="entry-meta">
                                    <span class="posted-on">
                                        <!-- date posted -->
                                        <time class="entry-date published" itemprop="datePublished">${date}</time>
                                    </span>
                                    <span class="byline">by <span class="author vcard" itemprop="author">
                                            <a class="url fn n" href="#" title="View all posts by a1mno" rel="author"     itemprop="url"> 
                                                <!-- author name -->
                                                <span class="author-name" itemprop="name">${article.author}</span></a>
                                    </span>
                                    </span>
                                </div>
                            </header>
                            <div class="entry-summary" itemprop="text">
                                <!-- description -->
                                <p>${article.description}... <a title="How an Online Criminal Justice Degree Can Help You Advance Your Career" class="read-more"
                                        href="https://propsanty.com/how-an-online-criminal-justice-degree-can-help-you-advance-your-career/" aria-label="Read more about How an Online Criminal Justice Degree Can Help You Advance Your Career">Read more
                                    </a>
                                </p>
                            </div>
                        </div>
                    </article>
                        `;
                        }
                    });
                    document.querySelector('#main').innerHTML = articlesHTML;
                    createPaginationButtons();
                    break;
                case "error":
                    alert(`${data.message}`);
                    break;
                default:
                    break;
            }
        }).catch((err) => {
            alert(`Something went wrong.\n${err.message}`)
        })

}


var calculateTotalPages = (totalItems, page_size) => {
    return Math.ceil(totalItems / page_size);
}

var total_pages = calculateTotalPages(totalItems, page_size);

function createPaginationButtons() {
    var pagination_container = document.querySelector('.pagination');
    pagination_container.innerHTML = '';
    for (i = 1; i < total_pages; i++) {
        (function(pageNumber) {
            var button = document.createElement('button')
            button.className = 'pagination_button';
            button.textContent = pageNumber;
            button.addEventListener('click', () => {
                page = pageNumber;
                fetchArticles();
            });
            pagination_container.appendChild(button)
        })(i)
    }
}

function updatePaginationUI() {
    var buttons = document.querySelectorAll('.pagination_button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.textContent) === page) {
            button.classList.add('active');
        }
    });
}
fetchArticles();