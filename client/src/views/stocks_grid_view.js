const PubSub = require ('../helpers/pub_sub.js')

const StockGridView = function (container){
  this.container = container
}


StockGridView.prototype.bindEvents = function () {
  this.render()
};


StockGridView.prototype.render = function (container) {

  PubSub.subscribe("StockModel: Company-realtime-info", (event) => {
    console.log('this is the render', event.target);
    const companyInfo = event.target;
    return companyInfo
  })
};

StockGridView.prototype.renderCompanyName = function () {

};


module.exports = StockGridView;
