const categories = [
    {
        name: "Auto",
        icon: `fa-solid fa-car-rear`,
        announcementsCount: 123,
        link: "#",
    },
    {
        name: "Elettronica",
        icon: `fa-solid fa-laptop`,
        announcementsCount: 564,
        link: "#",
    },
    {
        name: "Moto",
        icon: `fa-solid fa-motorcycle`,
        announcementsCount: 230,
        link: "#",
    },
    {
        name: "Abbigliamento",
        icon: `fa-solid fa-shirt`,
        announcementsCount: 321,
        link: "#",
    },
    {
        name: "Sport",
        icon: `fa-solid fa-person-running`,
        announcementsCount: 90,
        link: "#",
    },
    {
        name: "Giardinaggio",
        icon: `fa-solid fa-leaf`,
        announcementsCount: 50,
        link: "#",
    },
    {
        name: "Casa",
        icon: `fa-solid fa-house-chimney`,
        announcementsCount: 134,
        link: "#",
    },
    {
        name: "Cucina",
        icon: `fa-solid fa-fire-burner`,
        announcementsCount: 176,
        link: "#",
    },
];


//Declaretion


function createNavbarCateg (categories , target) {
    
    let div = document.createElement(`div`)
    div.classList.add(`dropdown-menu`)
    
    categories.forEach(category => {
        console.log(category)
        let a = document.createElement(`a`)
        a.classList.add(`dropdown-item`)
        a.setAttribute(`href`,category.link)
        a.innerHTML=category.name
        
        div.appendChild(a)
        target.appendChild(div)
        
    });
    
    
  }
  
  function createSelectCateg (categories,target) {
    
    categories.forEach(category=>{
        let option = document.createElement(`option`)
        option.setAttribute(`value`,category.name)
        option.innerHTML=category.name
        target.appendChild(option)
    })
  
  }
  
  function createCardCategory (categories,target) {
    categories.forEach(category=>{
        let div1=document.createElement(`div`)
        div1.classList.add(`col-12`,`col-md-4`,`col-lg-3`,`mb-5`,)
        let div =document.createElement(`div`)
        div.classList.add(`card`,`modCard`)
       div.innerHTML=
       `<div class="card-body py-5 text-center">
       <i class="${category.icon} fa-2xl mb-4 textCat"></i>
        <p class="h3 card-title py-1">${category.name}</p>
        <p class="my-1 py-1"><b class="textCat">${category.announcementsCount}</b> annunci</p>
         
       </div>`
       div1.appendChild(div)
       target.appendChild(div1)
  
  
       div1.addEventListener(`click`, ()=>{
        alert (`Vai al ${category.link}`)
       })
    })
  
  }
  
  function getCarouselCard (count=6 ,target) {
  
      fetch (`./data/products.json`)
      .then((res)=>res.json())
      .then((annunci)=>{
          console.log(annunci)
          createCarouselCard(annunci,target)
      })
  }
  
  function createCarouselCard (annunci ,target) {
      annunci.forEach( (annuncio,index) => {
          console.log(annuncio)
          if(index<6) {
              let div = document.createElement(`div`)
              div.classList.add(`col-12`,`col-md-6`,`col-lg-4`,`mb-3`)
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
              <card class="footer py-2">
                  <div class="row">
                      <div class="col-6">    <i class="fa-solid fa-tag" style="color: #2369e1;"></i>  ${annuncio.category}</div>
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
          
      });
  }
  
  function createBadge(annuncio) {
  
      console.log(annuncio.type)
      if(annuncio.type===`sell`){
          let span =`<span class="span badge bg-warning">Vendo</span>`
          return span
      }else if(annuncio.type===`search`) {
          let span =`<span class="span badge bg-success">Compro</span>`
  
          return span
      }
  }
  
  
  


