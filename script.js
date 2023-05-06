const carousel = document.querySelector('.carousel')
const arrowBtns = document.querySelectorAll('.arrow')
let isDragging = false, startX, startScrollLeft
const firstCardWidth = document.querySelector('.carousel__card').offsetWidth + 16;

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

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mouseup', dragStop)
