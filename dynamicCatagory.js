fetch('https://openapi.programming-hero.com/api/news/categories') // catagoris load 
    .then((response) => response.json())
    .then((data) => loadAllCatagory(data.data.news_category)) // navar catagory show koralam loadcatagory call kore
    .catch(error => console.log(error));  //error handle 


function loadAllCatagory(catagoris) {
    const catagoryUl = document.getElementById('dynamicCatagory');
    catagoris.forEach(element => { //each catagorir theke name nilam ar id loadNewsall pataidilam
        const list = document.createElement('li');
        list.classList.add('nav-item');
        list.innerHTML = `
        <a class="nav-link active text-white" aria-current="page" href="#"  onclick="loadNewsall('${element.category_id}')">${element.category_name}</a>
        `
        catagoryUl.appendChild(list);
    });

   
}
function loadNewsall(catagorisId) {
    // start sppiner 
    toggle(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${catagorisId}`) // id wise catagory fecth kora holo
        .then((response) => response.json())
        .then((data) => loadNews(data.data)) //per catagorir sb gula data array loadNews function e patano holo
        .catch(error => console.log(error));
}
const loadNews = news => {
    const newsSection = document.getElementById("divBody");
    const totalNewsfnd = document.getElementById("total");
    totalNewsfnd.innerText = news.length;
    if (news.length == 0) {
        let title = document.getElementById("items")
            title.innerText = "No News Found in caltural catgory"
        totalNewsfnd.innerText = '';  //error handle
    }
    else {
        let title = document.getElementById("items")
        title.innerText = "items found for category Entertainment"
    }
    newsSection.innerHTML = '';
    news.sort(function (a, b) {
        return b.total_view - a.total_view //sort kora holo news higest view er upor short function run kore 
        
    });
   
    news.forEach(element => { // potita news div show koranor jonne code
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row');
        newsDiv.classList.add('g-1');
        newsDiv.innerHTML = `
        <div class=" col-12 col-md-3 m-0 p-0 text-center text-sm-start text-md-start text-lg ">
            <img src="${element.thumbnail_url ?element.thumbnail_url : "No Thumblin found"}" class="img-fluid p-3 rounded-start" alt="...">
        </div>
        <div class="col-12 col-md-8">
            <div class="card-body">
                <h5 class="card-title">${element.title ?element.title :"no title found" }</h5>
                <p class="card-text">${element.details ?element.details.slice(1,400) :"no details found"}...</p>
                <div class="d-lg-flex justify-content-between align-items-center">
                   <div class="d-flex mb-4">
                   <img class="me-2 rounded-circle" src="${element.author.img ? element.author.img :"No author image found"}" width=45px alt="" srcset="">
                    <div>
                        <p class="card-text m-0"><small class="text-muted">${element.author.name ?element.author.name  :"NO name found"}</small></p>
                        <p class="card-text m-0 p-0"><small class="text-muted">${element.author.published_date?element.author.published_date:"no publish days found"}</small></p>
                    </div>
                   </div>
                    <div>
                        <i class="fa-regular fa-eye"> <span>${element.total_view?element.total_view :"0" }</span> M</i>
                    </div>
                    <div>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div>
                    <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsleModal" onclick="loaddetails('${element._id}')"> 
                     </i>
                    </div>
                </div>
            </div>
        </div>
       
        `
        newsSection.appendChild(newsDiv);
    });
    // stop spiner 
    toggle(false);
     // for filter
}
const loaddetails = id => { //model er jonne code
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayNewsDetails(data.data[0]))
        .catch(error => console.log(error));
}

const displayNewsDetails = data => { //modal body te news show koranor jonne function
    let newsDetailsBody = document.getElementById("newsleModal")
    newsDetailsBody.innerHTML = '';
    let newsCardDiv = document.createElement('div');
    newsCardDiv.classList.add('modal-dialog');
    newsCardDiv.innerHTML = `
    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="">
                            <div class="card modal-body">
                                <img src="${data.image_url? data.image_url: "no Image found"}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.title?data.title:"No title found"}</h5>
                                    <p class="card-text">${data.details ? data.details.slice(1,300) :"no details"}</p>
                                        <div class="d-flex mb-4">
                                        <img class="me-2 rounded-circle" src="${data.author.img ?data.author.img :"no author image found"}" width=45px alt="" srcset="">
                                         <div>
                                             <p class="card-text m-0"><small class="text-muted">${data.author.name?data.author.name:"no author name"}</small></p>
                                             <p class="card-text m-0 p-0"><small class="text-muted">${data.author.published_date}</small></p>
                                         </div>
                                         <div>
                                         <i class="fa-regular fa-eye"> <span>${data.total_view ? data.total_view:"0"}</span> M</i>
                                         </div>
                                        </div>
                                       
                                </div>
                            </div>
                        </div>
                    </div>

    `
    newsDetailsBody.append(newsCardDiv);
    
}
const toggle = isSpin => { // sppiner function
    const spin = document.getElementById('spiner');
    if (isSpin) {
        spin.classList.remove('d-none');
    }
    else {
        spin.classList.add('d-none');
    }
}
