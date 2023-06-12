document.addEventListener("DOMContentLoaded", ()=>{
   const cookie = document.querySelector('.cookie')
   const cookitBtns = document.querySelectorAll('.cookie__button')
   cookitBtns.forEach((item)=>item.addEventListener('click',()=>{
      cookie.classList.add('hide')
   }))
   const modal = document.querySelector('.modal')
   const allBtns = document.querySelectorAll('.button_primary--dark')
   const name =  document.querySelector('.input__name')
   const email =  document.querySelector('.input__email')
   const phone =  document.querySelector('.input__phone')
   const valid = [name, email, phone]
   const flag = document.querySelector('.flag')
   const message = document.querySelectorAll('.modal__input__error')
   const modalErr = document.querySelector('.modal__error')
   const button = document.querySelector('.modal__button')
   const close = document.querySelector('.modal__close')
   const sucModal = document.querySelector('.modal_succsess')
   const btnCloseSuc = document.querySelector('.modal_succsess__close')
   const arrowCloseSuc = document.querySelector('.modal_succsess__button')
   const closeSuc = [btnCloseSuc, arrowCloseSuc]
   valid.forEach((item, i)=>{
      item.addEventListener('blur',(event)=>{
        if (!event.target.value.trim()) {
         message[i].classList.add('error')
         modalErr.classList.add('error')
        } else{
         message[i].classList.remove('error')
         if (!contains('error',message)) modalErr.classList.remove('error')
        }
        if (!isEmpty(valid)) {
         button.disabled =false
      } else {
         button.disabled =true
      }
      })
   })
   function contains(className, arr){
      let result =false
      arr.forEach(item=>{
         if(item.classList.contains(className)) {
            result=true
         }
      })
      return result
   }
   function isEmpty (arr) {
      let result = false
      arr.forEach(item=>{
         if(!item.value){
            result=true
         }
      })
      return result;
   }
   allBtns.forEach((item)=>{
      item.addEventListener('click',()=>{
         sucModal.classList.remove('active')
         if(!item.classList.contains('modal__button')){
            modal.classList.add('active')
         }
            if(!item.classList.contains('modal__button')){
               item.classList.add('pressed')
            }
      })
   })
   close.addEventListener('click',()=>{
         modal.classList.remove('active')
         allBtns.forEach((item)=>{
            if(!item.classList.contains('modal__button')){
               item.classList.remove('pressed')
            }
         })
      })
   button.addEventListener('click',(e)=>{
      e.preventDefault()
      modal.classList.remove('active')
      sucModal.classList.add('active')
   })
   closeSuc.forEach(item=>{
      item.addEventListener('click',()=>{
         sucModal.classList.remove('active') 
      })
   })
   let phoneInputs = document.querySelectorAll('.input__phone');

    let getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    let onPhonePaste = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        let pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            let pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    let onPhoneInput = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            flag.classList.add('active')
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            flag.classList.remove('active')
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    let onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (let phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
});
