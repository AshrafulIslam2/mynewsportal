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
         console.log(element.category_id)
    });
  }