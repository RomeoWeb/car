
const popuplinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 800;

if (popuplinks.length > 0) {
   for (let index = 0; index < popuplinks.length; index++) {
      const popupLink = popuplinks[index];
      popupLink.addEventListener("click", function(e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const currentPopup = document.getElementById(popupName);
         popupOpen(currentPopup);
         e.preventDefault();
      });
   }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if(popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function(e) {
         if (!e.target.closest('.popup__content')) {
            console.log('fdgfd');
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}

 function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');
       if (doUnlock) {
         bodyUnlock();
       }
    }
 };
 
 function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
   console.log(lockPaddingValue);
   if(lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function() {
       unlock = true;
    }, timeout);
    }
 
function bodyUnlock() {
 setTimeout(function() {
    if(lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = '0px';
       }
      }

      body.style.PaddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);
   unlock = false;
   setTimeout(function(){
      unlock = true;
   },timeout);
}

document.addEventListener('keydown', function(e) {
   if(e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

function closePopup() {
   const popupActive = document.querySelector('.popup.open');
   popupActive.classList.remove('open');
   bodyUnlock();
}