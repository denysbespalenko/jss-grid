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

for(let i=0; i<25 ;i++){
  let item = document.createElement('div');
  item.className = ('item');
  item.innerText = `${25-i}`;
  tradesWrap.append(item);
  }


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
   if (!filterArr.includes(item['Mkt Group']) && item['Mkt Group']){
       let filterItem = document.createElement('li');
       filterItem.className = ('filter-item');
       filterItem.innerText = item['Mkt Group'];
       filterItem.setAttribute('value',item['Mkt Group']);

       if(filterArr.length <= 0) {
        filterItem.classList.add('active');
        renderBlocks(item['Mkt Group'],arr);
        
      }

       filterArr.push(item['Mkt Group']);
       filterBlock.append(filterItem);
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
      console.log(item.getAttribute('value'))
    })
  })


}

function renderBlocks(blockGroup, arr){

    const blockGroupArr = arr.filter(item => item['Mkt Group'] === blockGroup)
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
     trendtype.innerText = (blockItem['Type']);
     let symbol = document.createElement('div');
     symbol.className = ('symbol');
     symbol.innerText = (blockItem['Symbol']);
     let marketState = document.createElement('div');
     marketState.className = ('marketState');
      marketState.innerText = ('MS');
     let rValue = document.createElement('div');
     rValue.className = ('rValue');
     rValue.innerText = ('=R');
     item.append(trendtype,symbol,marketState,rValue);
  
      boxWrap.append(item);
    })
}

function afterFetch(json){
  let fetchData = JSON.parse(json).map(item => item['data']).flat();
  renderFilters(fetchData);

}
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://script.google.com/macros/s/AKfycbye7wMDg5gkcFDn9MWUT-XCcK0BtDqTAXAivF4bJRyRuBY4Ar0T8Io/exec", requestOptions)
  .then(response => response.text())
  .then(result => afterFetch(result))
  .catch(error => console.log('error', error));