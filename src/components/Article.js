


/**
* Not Found Page
*/
function PageNotFound() {
    return (
        <article>
            <h1>Page Not Found</h1>
            <p>It seems the page you are looking for does not exist.</p>
        </article>
    );
}



/**
 * Fetch the Article by Slug
 */
function fetchArticleBySlug(slug) {

  const [notFoundSlugs, setNotFoundSlugs] = useState([]); // Adding not found slugs

    const _url = url + 'wp/v2/posts?slug=' + slug;
    setLoading(true);
    axios({
        method: 'GET',
        url: _url
    }).then(function (response) {
        if (response.status === 200 && response.data) {
            const data = response.data;
            // If the article is found, add it to articles.
            if (data.length) {
                let _articles = [...articles, ...data];
                setArticles(_articles);
            } else {
                // Set this slug to not found slugs.
                setNotFoundSlugs(slug);
            }
        }
        setLoading(false);
    })
        .catch(function (error) {
            console.error(error);
        });
}

/**
* Get the Article by Slug
*/
function GetArticleBySlug() {
    let { id } = useParams();
    let article = {};
    for (var i = 0; i < articles.length; i++) {
        if (articles[i].slug === id) {
            article = articles[i];
            break;
        }
    }
    // If article was not found and we did not yet check this, try to fetch it.
    if (notFoundSlugs.indexOf(id) < 0 && Object.keys(article).length === 0) {
        fetchArticleBySlug(id);
    }
    return (<Article article={article} currentPage={currentPage} />);
}



/**
 * Article Component
 */
function Article(props) {
    const params = useParams();
    const the_article = props.article;


    // No article? Show not found.
    if (!Object.keys(the_article).length) {
        return <PageNotFound />;
    }

    return (
        <article id={the_article.ID}>
            <Link className='btn btn-primary' to={"/page/" + props.currentPage}>Back</Link>
            <h1>{the_article.title.rendered}</h1>
            <div class="content" dangerouslySetInnerHTML={{ __html: the_article.content.rendered }}></div>
        </article>
    )
}


