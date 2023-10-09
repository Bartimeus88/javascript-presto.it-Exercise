const navbarCateg = document.getElementById(`navbarCateg`)
const selectCateg = document.getElementById(`selectCateg`)
const cardAnnunci =document.getElementById(`cardAnnunci`)
const inputDefault=document.getElementById(`inputDefault`)
const searchForm =document.getElementById(`searchForm`)
const inputMin = document.getElementById(`inputMin`)
const inputMax=document.getElementById(`inputMax`)





//declaretion

searchForm.addEventListener(`submit`,(event)=>{
    event.preventDefault()

    const filter = {
        search:inputDefault.value,
        category:selectCateg.value,
        priceMin:inputMin.value,
        priceMax:inputMax.value,
    }

    console.log(filter)
    getAllAnnouncments(filter ,cardAnnunci )
})

function createCarouselCard2 (annuncio ,target) {
    
        
    let div = document.createElement(`div`)
    div.classList.add(`col-12`,`col-md-6`,`col-lg-4`,`mb-4`)
    let template =
    `<div class="card">
    <div id="carousel-${annuncio.id}" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://picsum.photos/600/600" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="https://picsum.photos/600/601" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${annuncio.id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${annuncio.id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    <div class="card-body">
      <p class="h3 card-title mb-3">${parseFloat(annuncio.price).toFixed(2)} €</p>
      <p class="card-text h3 mb-3">${annuncio.name}</p>
      <p class="card-text mb-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <card class="footer pt-2 pb-1 px-2">
        <div class="row">
            <div class="col-6">   <i class="fa-solid fa-tag" style="color: #2369e1;"></i>  ${annuncio.category}</div>
            <div class="col-6">data</div>
        </div>
        <div class="h5">
        ${createBadge(annuncio)}
        </span>
    </div>
    </card>
  </div>`
  div.innerHTML=template
  target.appendChild(div)
}


function getAllAnnouncments(filter,target){
    fetch(`./data/products.json`)
    .then((res)=>res.json())
    .then((announcements)=>{
        
        let filteredAnnouncements = filter ? announcements.filter(ann=>filterCheck(ann)) : announcements
        console.log(filteredAnnouncements);

        cardAnnunci.innerHTML=``;
        filteredAnnouncements.forEach((ann)=>
        createCarouselCard2 (ann,target)
       
        );
    

    function filterCheck(annuncio) {
        let filterCheck = annuncio.name.toLowerCase().includes(filter.search.toLowerCase());

        if (filter.category !== ``) {
            filterCheck = annuncio.category == filter.category && annuncio.name.toLowerCase().includes(filter.search.toLowerCase());
        }

        if (filter.priceMin !== ``|| filter.priceMax !== ``) {
            let min = filter.priceMin == `` ? 0 : Number(filter.priceMin);
            let max=filter.priceMax ==``?Infinity:Number(filter.priceMax)
            
            let categoryCheck = `all`;

            if (filter.category !== ``) {
                categoryCheck = annuncio.category == filter.category;
            }

            filterCheck = 
            annuncio.name.toLowerCase().includes(filter.search.toLowerCase())&& categoryCheck && 
            Number(annuncio.price)>= min &&
            Number(annuncio.price)<=max;
        }

        return filterCheck
    }
})

.catch(error => {
    console.log(error)
})
}


    ;



//Execute
createNavbarCateg (categories , navbarCateg)
createSelectCateg (categories,selectCateg)
