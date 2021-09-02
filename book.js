
//fetch API
const searchbook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    spinner('block');
    // clear data
    searchField.value = '';
    
    if (searchText == '') {
        alert('Please Write Something In the Text Field');
        spinner('none');
    }
    else {
        // load data
      
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
           // .then(data => console.log(data.numFound));

           fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => load(data.numFound));

    }
}




//spinner loading//
const spinner=style=>{

    document.getElementById('spinner').style.display=style;

}

// set value

const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
   
    if (books.length == 0) {
        // show no result found;
        spinner('none');
        alert("No Books Found!!! Please Write The Valid Book");
    }
    books.forEach(book => {
        // console.log(book);
     
       
        const div = document.createElement('div');
        div.classList.add('col');
        

        //image load function


        function loadimg(){
        if( book.cover_i!=null){
             return book.cover_i;
        }
        else
        return 554106;
    }




        div.innerHTML = `
        <div  class="card h-100">
        
        <img src="https://covers.openlibrary.org/b/id/${loadimg()}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title text-info"><b>${book.title}</b></h3>
            <p class="card-text">Author :<b>&nbsp${book.author_name}</b></p>
            <p class="card-text">Publisher:<b>&nbsp${book.publisher}</b></p>
            <p class="card-text">Publishe Year</b>:&nbsp${book.first_publish_year}</b></p>
        </div>
    </div>
        `;
        spinner('none');
    
        
        searchResult.appendChild(div);
    })
}

//total search

const load = total => {

    document.getElementById('total_search').innerText=`Search Result : ${total}`;
}