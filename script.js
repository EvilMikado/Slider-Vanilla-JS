const carousel = document.querySelector('.carousel')
const arrowBtns = document.querySelectorAll('.arrow')
let isDragging = false, startX, startScrollLeft, interval
const firstCardWidth = document.querySelector('.carousel__card').offsetWidth;

const carouselChildrens = [...carousel.children]

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})

carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

arrowBtns.forEach(btn => {
  btn.addEventListener('click', ()=>{
    carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStart = e =>{
  isDragging = true;
  carousel.classList.add('dragging')
  startX = e.pageX
  startScrollLeft = carousel.scrollLeft
}

const dragging = e =>{
  if (!isDragging) return
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () =>{
  isDragging = false;
  carousel.classList.remove('dragging')
}

const infiniteScroll = () =>{
  if (carousel.scrollLeft === 0) {
    carousel.classList.add('no-smooth-scroll')
    carousel.scrollLeft =  carousel.scrollWidth - (2 * carousel.offsetWidth)
    carousel.classList.remove('no-smooth-scroll')
  }else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth -carousel.offsetWidth){
    carousel.classList.add('no-smooth-scroll')
    carousel.scrollLeft = carousel.offsetWidth
    carousel.classList.remove('no-smooth-scroll')
  }
}

const autoPlay = () =>{
  if (window.innerWidth < 800) return
  interval = setInterval(()=>{
    carousel.scrollLeft += firstCardWidth
  }, 3000)
}


 autoPlay()
carousel.addEventListener('mouseover', () => clearInterval(interval))
carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mousedown', dragStart)
document.addEventListener('mouseup', dragStop)
carousel.addEventListener('scroll', infiniteScroll)
