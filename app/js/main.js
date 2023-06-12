document.addEventListener("DOMContentLoaded", ()=>{
   const cookie = document.querySelector('.cookie')
   const cookitBtns = document.querySelectorAll('.cookie__button')
   cookitBtns.forEach(()=>addEventListener('click',()=>{
      cookie.classList.add('hide')
   }))
});
