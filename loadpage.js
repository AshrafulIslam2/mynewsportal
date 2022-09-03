document.getElementById("blogs").addEventListener('click', function () {
    window.location.href='blog.html';
})
document.getElementById("newsbar").addEventListener('click', function () {
    window.location.href='index.html';
})

function loadAllNews() {
    fetch(`https://openapi.programming-hero.com/api/news/category/08`)
    .then((response) => response.json())
     .then((data) => home(data.data))
}
const home = allnews => {
    console.log(allnews);
 }