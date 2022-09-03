fetch('https://openapi.programming-hero.com/api/news/categories')
  .then((response) => response.json())
  .then((data) => loadAllCatagory(data.data.news_category));


function loadAllCatagory(catagoris) {
    console.log(catagoris);
    catagoris.forEach(element => {
        const catagoryUl = document.getElementById('dynamicCatagory');
        const list = document.createElement('li');
        list.classList.add('nav-item');
        list.innerHTML = `
        <a class="nav-link active text-white" aria-current="page" href="#"  onclick="loadNews(${element.category_id})">${element.category_name}</a>
        `
        catagoryUl.appendChild(list);
    });
}
function loadNews(catagorisId){
    fetch(`https://openapi.programming-hero.com/api/news/category/0${catagorisId}`)
  .then((response) => response.json())
        .then((data) => loadNews(data.data));
    
    function loadNews(news) {
        const newsSection = document.getElementById("divBody");
        const totalNewsfnd = document.getElementById("total");
        totalNewsfnd.innerText = news.length;
        (news.length);
        newsSection.innerHTML = '';
        news.forEach(element => {
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('row');
            newsDiv.classList.add('g-1');
            newsDiv.innerHTML = `
            <div class=" col-12 col-md-3 m-0 p-0 text-center text-sm-start text-md-start text-lg ">
                <img src="${element.thumbnail_url}" class="img-fluid p-3 rounded-start" alt="...">
            </div>
            <div class="col-12 col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.details}</p>
                    <div class="d-lg-flex justify-content-between align-items-center">
                       <div class="d-flex mb-4">
                       <img class="me-2 rounded-circle" src="${element.author.img}" width=45px alt="" srcset="">
                       <div>
                           <p class="card-text m-0"><small class="text-muted">${element.author.name}</small></p>
                           <p class="card-text m-0 p-0"><small class="text-muted">${element.author.published_date}</small></p>
                       </div>
                       </div>
                        <div>
                            <i class="fa-regular fa-eye"> <span>${element.total_view}</span> M</i>
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
  }
    
}

const loaddetails = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((data) =>   displayNewsDetails(data.data[0]));
  ;
}

const displayNewsDetails = data => {
    console.log(data);
    let newsDetailsBody = document.getElementById("newsleModal")
    let newsCardDiv = document.createElement('div');
    newsCardDiv.classList.add('modal-dialog');
    newsCardDiv.innerHTML = `
    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newsModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="">
                            <div class="card modal-body">
                                <img src="${data.image_url}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.title}</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up
                                        the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>

    `
    newsDetailsBody.append(newsCardDiv);
    
}
  