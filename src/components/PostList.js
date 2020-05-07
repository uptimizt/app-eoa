import React, { useState, useEffect } from 'react';
const axios = require('axios');

/**
 * Showing articles
 **/
function Articles( props ) {
    let pagination = [];
  // Show a button to set the current page for each page.
  for( var p = 1; p <= props.totalPages; p++ ) {
    let page = p;
    pagination.push( <button onClick={ () => { props.setCurrentPage( page ) } }>{ p }</button> );
  }
  
  // For all the articles that are passed, add article
  const articles = props.articles.map( ( item, index ) => {
    return <article key={ 'article-' + index }>
        <h2 dangerouslySetInnerHTML={ { __html: item.title.rendered } }></h2>
        <div className="content" dangerouslySetInnerHTML={ { __html: item.excerpt.rendered } }></div> 
    </article>
  });

  return (
    <div className="articles">
      { articles }
      { pagination }
    </div>
  )

}


/**
 * Returns articles for the current page.
 * @param {integer} page 
 * @param {array} articles 
 * @param {object} articlesPages 
 */
function getArticlesForPage( page = 1, articles, articlesPages ) {
 // If we don't have them, return empty array
 if ( ! articlesPages[ page ] ) {
    return [];
  }
  // If there are no articles at all, return empty array
  if ( articles.length === 0 ) {
    return [];
  }
 
  let the_articles = [];

  // For each article ID inside of the provided page, 
  // push the whole article object to the array
  for( var i = 0; i < articlesPages[page].length; i++ ) {
    var articleID = parseInt( articlesPages[page][i] );
    for( var a = 0; a < articles.length; a++ ) {
      if ( parseInt( articles[ a ].id ) === articleID ) {
        the_articles.push( articles[ a ] );
         
        break;
      }
    }
  } 
  // Return array of article objects.
  return the_articles;
}

export default function PostList() {
  // Signal if the app is already loading or not
  const [loading, setLoading] = useState(false);
  // All articles that we have loaded
  const [articles, setArticles] = useState([]);
  // Pages with articles IDs
  const [articlesPages, setArticlesPages] = useState({});
  // Current Page
  const [currentPage, setCurrentPage] = useState(1);
  // Total Pages
  const [totalPages, setTotalPages] = useState(0);

  // REST URL
  const url = 'https://bizzapps.ru/wp-json/';


  // Using useEffect to load new articles on change.
  useEffect(() => {
    // The current page
    const page = currentPage;
    
    // If we are loading, don't try to load again.
    if ( loading ) {
      return;
    }
    
    // If we have articles for that page already, don't load.
    if ( Object.keys( articlesPages ).indexOf( page.toString() ) >= 0 ) {
      return;
    }
    
    // Build up the URL with the page
    const _url   = url + 'wp/v2/posts?page=' + page;
    
    // Set the loading to true.
    setLoading( true );
    
    // Get the posts.
    axios({
        method: 'GET',
        url: _url
    }).then(function (response) {
        if ( response.status === 200 && response.data ) {
            // If we don't have the total pages already, get them from the headers sent by WP.
            if ( totalPages === 0 && Object.keys( response.headers ).indexOf('x-wp-totalpages') >= 0 ) {
              setTotalPages( parseInt( response.headers['x-wp-totalpages'] ) );
            }
            
            const data = response.data;
            // Merge previously loaded articles with new ones.
            let _articles = [ ...articles, ...data ];
 
            let _articlesPages = articlesPages;
          
            _articlesPages[ page ] = [];
            // Add the loaded page to state with article IDs.
            for( var a=0; a < data.length; a++ ) {
              _articlesPages[ page ].push( data[ a ].id );
            }
          
            setArticlesPages( _articlesPages );
            setArticles( _articles );
        }
      
        setLoading(false);
    })
    .catch(function (error) {
       console.error( error );
    });

  }, [ currentPage, loading, articlesPages, articles, totalPages ]);

  return (
      <div className="App">
        <div className="container">
              <Articles 
                currentPage={ currentPage } 
                setCurrentPage={ setCurrentPage }
                articles={ getArticlesForPage( currentPage, articles, articlesPages ) }
                totalPages={ totalPages }
                />
                { loading && <p>Loading</p>}
        </div>
      </div>
  );
}

