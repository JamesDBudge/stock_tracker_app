const PubSub = require('../helpers/pub_sub.js')

const PageDisplay = function(){

}

PageDisplay.prototype.bindEvents = function () {

  const toggleSearch = document.querySelector("#dashboardToggle")
  toggleSearch.addEventListener('change', (event) => {
    const heldPage = document.querySelector('#held_stocks')
    const searchPage = document.querySelector('#searchToggle')
    console.log(event.target);
    console.log(searchPage);
    heldPage.classList.add('visibility')
    searchPage.classList.remove('visibility')
  })

  const toggleStock = document.querySelector("#searchToggle")
  toggleStock.addEventListener('change', (event) => {
    const heldPage = document.querySelector('#held_stocks')
    const searchPage = document.querySelector('#searchToggle')
    console.log(event.target);
    console.log(searchPage);
    heldPage.classList.add('visibility')
    searchPage.classList.remove('visibility')
  })


}


module.exports = PageDisplay;
