// const boxWrap = document.querySelector('.boxes-wrap');
const tradesWrap = document.querySelector('.trades-wrap')

// for(let i=0; i<7*7 ;i++){
//   let item = document.createElement('div');
//   item.className = ('item');
//   item.style = ('background-color: #ffffff');
//   let trendtype = document.createElement('div');
//   trendtype.className = ('trendtype');
//   trendtype.innerText = ('TT');
//   let symbol = document.createElement('div');
//   symbol.className = ('symbol');
//   symbol.innerText = ('Symbol');
//   let marketState = document.createElement('div');
//   marketState.className = ('marketState');
//   marketState.innerText = ('MS');
//   let rValue = document.createElement('div');
//   rValue.className = ('rValue');
//   rValue.innerText = ('=R');
//   item.append(trendtype,symbol,marketState,rValue);
  
//   boxWrap.append(item);
//   }

document.querySelectorAll('.section-info .header .tab a').forEach(item => {
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    const id = e.target.getAttribute('href');
    
    document.querySelectorAll('.section-info .info-wrap .item').forEach(child => {
      child.classList.remove('active');
    });
   
    document.querySelector(`#${id}`).classList.add('active');
    
  })
})

function renderFilters(arr){
  const filterArr = [];
  const filterBlock = document.querySelector('.page .header .filter ul');

  arr.forEach(item => {
   if (!filterArr.includes(item['date']) && item['date']){
       let filterItem = document.createElement('li');
       filterItem.className = ('filter-item');
       filterItem.innerText = item['date'];
       filterItem.setAttribute('value',item['date']);

       if(filterArr.length <= 0) {
        filterItem.classList.add('active');
        renderBlocks(item['date'],arr);
        
      }

       filterArr.push(item['date']);
       filterBlock.prepend(filterItem);
   }
  })


  const filter = document.querySelector('.filter');
  const filterItem = document.querySelectorAll('.filter-item');

  filterItem.forEach(item => {
      item.addEventListener('click', function(){

      let activeFilterItemValue = document.querySelector('.filter-item.active').getAttribute('value');  
      filter.classList.toggle('show');
      filterItem.forEach(closeItem => {
          closeItem.classList.remove('active')
      })

      if(activeFilterItemValue !== this.getAttribute('value')){
        renderBlocks(this.getAttribute('value'), arr);
      }

      this.classList.add('active');
    })
  })


}

function renderBlocks(blockGroup, arr){

    const blockGroupArr = arr.filter(item => item['date'] === blockGroup)
    const boxWrap = document.querySelector('.boxes-wrap');
    while (boxWrap.firstChild) {
     boxWrap.removeChild(boxWrap.lastChild);
    }

    blockGroupArr.forEach(blockItem => {

     let item = document.createElement('div');
     item.className = ('item');
     item.style = ('background-color: #ffffff');
     let trendtype = document.createElement('div');
     trendtype.className = ('trendtype');
     trendtype.innerText = (blockItem['name']);
     let symbol = document.createElement('div');
     symbol.className = ('symbol');
     symbol.innerText = (blockItem['symbol']);
     let marketState = document.createElement('div');
     marketState.className = ('marketState');
      marketState.innerText = ('MS');
     let rValue = document.createElement('div');
     rValue.className = ('rValue');
     rValue.innerText = ('=R');
     item.append(trendtype,symbol,marketState,rValue);
     boxWrap.append(item);

     item.addEventListener('click',function(e){
        renderBlockInformationOnClick(e);
      	renderPriceMap(e, arr);
     })
    })
}

function renderBlockInformationOnClick(e){
  //usage f.e. trendtype.innerText;
  const [trendtype, symbol, marketState,rValue] = e.currentTarget.childNodes;
  const informationBlock = document.querySelector('.page .section-info .info-wrap #tab1 .area2 div')
  informationBlock.innerText = symbol.innerText;

}
function renderPriceMap(e, arr){
	const [symbol] = e.currentTarget.childNodes;
	const date = document.querySelector('li.filter-item.active').innerText;
	const currentPriceMap = arr.filter(item => (item.date === date && item.name === symbol.innerText));

	document.querySelector('.trades-wrap').innerHTML = '';

	for(let priceMapItem in currentPriceMap[0]){
		if(priceMapItem.includes('pricemap'))  renderPriceMapBlock(currentPriceMap[0][priceMapItem])
	}

	function renderPriceMapBlock(text){
		let item = document.createElement('div');
 		item.className = ('item');
  		item.innerText = text;
 		tradesWrap.append(item);
	}
}
function afterFetch(json){
  let fetchData = JSON.parse(json).map(item => item['data']).flat();
  renderFilters(fetchData);
  console.log(fetchData);
}
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://script.google.com/macros/s/AKfycbz9c0nINX01nTyFxCv8qQM2obCFlN730uxxePwsYN9tTfoZMAJNA90KtaFGc7wtXq0/exec?getdata=price_map", requestOptions)
  .then(response => response.text())
  // .then(result => afterFetch(result))
  .then(result => afterFetch(result))
  .catch(error => console.log('error', error));
