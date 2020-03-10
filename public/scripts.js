const actualPage = location.pathname;
const menuItens = document.querySelectorAll("header .links a");

for(item of menuItens) {
    if(actualPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }
}