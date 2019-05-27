const PubSub = require('../helpers/pub_sub.js');
const GraphView = require('./graph_view.js')
const RequestHelper = require('../helpers/request_helper.js')


const SavedStocksView = function(container) {
  this.container = container;
  this.url = 'https://financialmodelingprep.com/api/v3/historical-price-full/'
}

SavedStocksView.prototype.render = function(stocks) {

  const stockContainer = document.createElement('details')
  stockContainer.classList.add("stock")
  stockContainer.id = stocks._id;
  this.container.appendChild(stockContainer)

  const companyName = this.createHeading("Name: " + stocks.name)
  stockContainer.appendChild(companyName)

  const totalValue = this.createHeading("Total Value: " + stocks.strike_price * stocks.quantity)
  stockContainer.appendChild(totalValue)

  const summary = document.createElement('summary')
  summary.textContent = stocks.name + " " + stocks.strike_price
  summary.addEventListener('click', (event) => {
    console.log("summary click", event);
    const data = stocks.name})

    const weeGraph = new GraphView(stocks._id)
    weeGraph.bindEvents()
    const requestHistorical = new RequestHelper(this.url + stocks.name)
    requestHistorical.get()
    .then((data) => {
      const companyInfo = data
      PubSub.publish("StockModel: Company-historical-info" , companyInfo );

    // PubSub.subscribe('GraphView:combined-data', (event) => {
    //   console.log(event);
    //   GraphView.renderGraph(stocks._id, stocks.name, event)
    //
    // })
  })
  stockContainer.appendChild(summary)

  const deleteButton = this.createDeleteButton(stocks._id);
  console.log(stocks._id);
  stockContainer.appendChild(deleteButton);


  const graph = document.createElement('div')
  graph.id = "graph-" + stocks.name
  stockContainer.appendChild(graph)
}

SavedStocksView.prototype.createHeading = function(textContent){
  const heading = document.createElement('p');
  heading.textContent = textContent;
  return heading;

}

SavedStocksView.prototype.createDeleteButton = function(stockId) {
    const button = document.createElement('button')
    button.classList.add('remove-button')
    button.value = stockId;
    console.log(stockId);


  button.addEventListener('click', (event) =>{
    // console.log(event);
    PubSub.publish('stock_view:stock-delete-clicked', event.target.value)
    console.log(event.target);
  })
  return button;
}


module.exports = SavedStocksView;
