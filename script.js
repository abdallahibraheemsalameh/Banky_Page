'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// //***************************************************** lazy loading image **************************************************
const allimages = document.querySelectorAll('.lazy-img');

const imgsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });
  imagesObserver.unobserve(entry.target);
};
const imagesObserver = new IntersectionObserver(imgsCallback, {
  root: null,
  threshold: 0,
  rootMargin: '150px',
});

allimages.forEach(function (img) {
  imagesObserver.observe(img);
});
// //***************************************************** building a slider component : part 1 **************************************************

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let currSlide = 0;
const dots = document.querySelectorAll('.dots__dot');
// slider.style.overflow = 'visible';

slides.forEach((ele, i) => (ele.style.transform = `translateX(${100 * i}%)`));
// first : 0% second:100% third:200%
btnRight.addEventListener('click', function (e) {
  if (currSlide <= slides.length - 2) {
    currSlide++;
    slides.forEach(
      (ele, i) =>
        (ele.style.transform = `translateX(${100 * (i - currSlide)}%)`)
    );
  } else {
    slides.forEach(
      (ele, i) => (ele.style.transform = `translateX(${100 * i}%)`)
    );
    currSlide = 0;
  }
  dots.forEach(function (ele, i) {
    if (i === currSlide) {
      dots.forEach(ele => ele.classList.remove('dots__dot--active'));
      ele.classList.add('dots__dot--active');
    }
  });
});

// cur = 1
// -200% -100% 0%

btnLeft.addEventListener('click', function (e) {
  if (currSlide == 0) {
    slides.forEach(
      (ele, i) => (ele.style.transform = `translateX(${100 * (i - 2)}%)`)
    );
    currSlide = 2;
  } else {
    currSlide--;
    slides.forEach(
      (ele, i) =>
        (ele.style.transform = `translateX(${100 * (i - currSlide)}% )`)
    );
  }
  dots.forEach(function (ele, i) {
    if (i === currSlide) {
      dots.forEach(ele => ele.classList.remove('dots__dot--active'));
      ele.classList.add('dots__dot--active');
    }
  });
});
// //***************************************************** building a slider component : part 2 **************************************************

dots.forEach(function (dot, i) {
  dot.addEventListener('click', function (e) {
    dots.forEach(ele => ele.classList.remove('dots__dot--active'));
    dot.classList.add('dots__dot--active');
    // in first dot 0% 100% 200%
    // in second dot -100% 0% 100%
    // in third dot -200% -100% 0%
    let slideNum = Number(dot.dataset.slide);
    if (slideNum === 0) {
      currSlide = 0;
      slides.forEach(
        (ele, i) =>
          (ele.style.transform = `translateX(${100 * (i - currSlide)}%)`)
      );
    }
    if (slideNum === 1) {
      currSlide = 1;
      slides.forEach(
        (ele, i) =>
          (ele.style.transform = `translateX(${100 * (i - currSlide)}%)`)
      );
    }
    if (slideNum === 2) {
      currSlide = 2;
      slides.forEach(
        (ele, i) =>
          (ele.style.transform = `translateX(${100 * (i - currSlide)}%)`)
      );
    }
  });
});
// //***************************************************** Revealing Elements on Scroll **************************************************
const allsections = document.querySelectorAll('.section');

const obsFunction = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(obsFunction, {
  root: null,
  threshold: 0.15,
});

allsections.forEach(function (sec) {
  sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
});

// //***************************************************** Revealing Elements on Scroll **************************************************

const nav = document.querySelector('nav');
const unorderList = document.querySelectorAll('.nav__link');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// }); // الطريقه القديمه

// tabed conponents

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard Clause
  if (!clicked) return;

  // active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //active content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Sticky navigation

// 📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗
// 📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗

// this way is not efictiant

// window.addEventListener('scroll', function () {
//   const initialCoords = section1.getBoundingClientRect();

//   // if(window.scrollY > initialCoords.top) nav.classList.add('sticky'); // onathor solution
//   if (initialCoords.top <= 0) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//🔴🟢

// const obsCallback = function (entries, observer) {
//   console.log(entries);
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1, // النسبه الي بتكون مبينه من سيكشن 1 علشان تنفذ الكود
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const headerCallback = function (entries) {
  //console.log(entries);
  const [entry] = entries; // سوينا هيك لانو اصلا انتريز هي اري جواتها اوبجيكت
  //console.log(entry.isIntersecting);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
// //***************************************************** IntersectionObserver **************************************************

const headerObserver = new IntersectionObserver(headerCallback, {
  root: null,
  threshold: 0,
  rootMargin: '-90px', // is a box of 90 pixels that will be applied outside of the target element (header) , and the unit must be in pixels and BTW the 90 is the hieght of the nav element
});
headerObserver.observe(header);
///////////////////////////////////////
// 👇👇👇👇👇👇👇👇🔴🔴🔴🔴🔴🔴🔴🔴 this is my solution before i saw the video 🔴🔴🔴🔴🔴🔴🔴🔴👇👇👇👇👇👇👇👇
/*

// const tab1Content = document.querySelector('.operations__content--1');
// const tab1BTN = document.querySelector('.operations__tab--1');
// const tab2BTN = document.querySelector('.operations__tab--2');
// const tab3BTN = document.querySelector('.operations__tab--3');
// const displayedContent = document.querySelector('.operations__content');

// tab2BTN.addEventListener('click', function (e) {
//   if (
//     tab3BTN.classList.contains('operations__tab--active') ||
//     tab1BTN.classList.contains('operations__tab--active')
//   ) {
//     tab1BTN.classList.remove('operations__tab--active');
//     tab3BTN.classList.remove('operations__tab--active');
//   }
//   tab2BTN.classList.add('operations__tab--active');

//   displayedContent.textContent = '';
//   const theContent = `<div class="operations__icon operations__icon--2">
//   <svg>
//     <use xlink:href="img/icons.svg#icon-home"></use>
//   </svg>
// </div>
// <h5 class="operations__header">
//   Buy a home or make your dreams come true, with instant loans.
// </h5>
// <p>
//   Duis aute irure dolor in reprehenderit in voluptate velit esse
//   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
//   cupidatat non proident, sunt in culpa qui officia deserunt mollit
//   anim id est laborum.
// </p>`;
//   displayedContent.insertAdjacentHTML('beforeend', theContent);
// });

// tab1BTN.addEventListener('click', function (e) {
//   if (
//     tab2BTN.classList.contains('operations__tab--active') ||
//     tab3BTN.classList.contains('operations__tab--active')
//   ) {
//     tab2BTN.classList.remove('operations__tab--active');
//     tab3BTN.classList.remove('operations__tab--active');
//   }
//   tab1BTN.classList.add('operations__tab--active');

//   displayedContent.textContent = '';
//   const theContent = ` <div class="operations__icon operations__icon--1">
//   <svg>
//     <use xlink:href="img/icons.svg#icon-upload"></use>
//   </svg>
// </div>
// <h5 class="operations__header">
//   Tranfser money to anyone, instantly! No fees, no BS.
// </h5>
// <p>
//   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//   eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//   ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//   aliquip ex ea commodo consequat.
// </p>`;
//   displayedContent.insertAdjacentHTML('beforeend', theContent);
// });

// tab3BTN.addEventListener('click', function (e) {
//   if (
//     tab2BTN.classList.contains('operations__tab--active') ||
//     tab1BTN.classList.contains('operations__tab--active')
//   ) {
//     tab1BTN.classList.remove('operations__tab--active');
//     tab2BTN.classList.remove('operations__tab--active');
//   }
//   tab3BTN.classList.add('operations__tab--active');

//   displayedContent.textContent = '';
//   const theContent = ` <div class="operations__icon operations__icon--3">
//   <svg>
//     <use xlink:href="img/icons.svg#icon-user-x"></use>
//   </svg>
// </div>
// <h5 class="operations__header">
//   No longer need your account? No problem! Close it instantly.
// </h5>
// <p>
//   Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
//   officia deserunt mollit anim id est laborum. Ut enim ad minim
//   veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
//   ea commodo consequat.
// </p>
// </div>
// </div>`;
//   displayedContent.insertAdjacentHTML('beforeend', theContent);
// });
*/
// 👆👆👆👆👆👆👆👆🔴🔴🔴🔴🔴🔴🔴🔴 this is my solution before i saw the video 🔴🔴🔴🔴🔴🔴🔴🔴👆👆👆👆👆👆👆👆
// Modal window

document.querySelectorAll('.nav__link').forEach(function (ele) {
  ele.addEventListener('click', function (e) {
    e.preventDefault();
    //   document
    //     .querySelector(this.getAttribute('href'))
    //     .scrollIntoView({ behavior: 'smooth' });
    console.log(e);
  });
});
// 👆👆 it work really fine there but the problem is that it's not really efficient so we are adding here the exact same callback function one to each of these three elements
//  it would be nice for only three elements but what if we had 1000 or like 10000 elements
// so that would then certainly impact the perfomance

// so we will use delegation

// delegation 📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const tar = e.target;

  if (tar.className === 'nav__link') {
    const tarHREF = tar.getAttribute('href');
    document.querySelector(tarHREF).scrollIntoView({ behavior: 'smooth' });
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // to select the whole page
// console.log(document.documentElement);
// // only head
// console.log(document.head);
// // only body
// console.log(document.body);

// document.querySelector('.header');
// const allsections = document.querySelectorAll('.section');
// console.log(allsections);

// document.getElementById('section--1');

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// //message.textContent = 'We use cookied for impoved functionality and analytics.';
// message.innerHTML =
//   'We use cookied for impoved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
// header.append(message);
// // header.before(message);
// // header.after(message);
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     // message.parentElement.removeChild(message);
//   });

// //**************************************************************************************************************************************** */
// //***************************************************** Styles , Attributes and Classes **************************************************

// // Styles

// message.style.backgroundColor = '#37383d';
// message.style.width = '100vw';

// //📗📗 here it will not appear any thing because we don't define the color here instead we define it in the css file 📗📗
// console.log(message.style.color);
// console.log(message.style.backgroundColor); // the backgroundColor defined in the script

// // 🔴🔴 to solve this problem we use getComputedStyle method to get all the styles that we defined or the browser defined

// //console.log(getComputedStyle(message));             // all the styles

// console.log(getComputedStyle(message).color);

// console.log(getComputedStyle(message).height);

// message.style.height = parseFloat(getComputedStyle(message).height) + 20 + 'px';

// // Attributes
// const logo = document.querySelector('.nav__logo');
// // we can access all logo attributes
// console.log(logo.alt);

// console.log(logo.className); //📗📗

// console.log(logo.src);
// console.log(logo.getAttribute('src')); // the exact url

// // Data attributes
// // we should in the html set an attribute that starts with ( data-name-name ) and any name you want after the - and the second -
// // and to call it we use dataset.the fist name after the first - and then the cppital letter of the second name
// // look at line 24 in the html
// console.log(logo.dataset.abdallahGpa);

// // Classed
// logo.classList.add('c', 'f'); // we can add multiple classes
// logo.classList.remove('c', 'f');
// logo.classList.toggle('c', 'f');
// logo.classList.contains('c', 'f');

// //***************************************************** Implementing Smooth Scrolling **************************************************

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   // console.log(e.target.getBoundingClientRect());

//   // to get the current scroll
//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

//   // to get the height and the width of the current viweport

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // 📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗
//   // 📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗

//   // scrolling down to section one

//   // window.scroll(s1coords.left, s1coords.top); //this solution is not enough it will work only if the viweport in the top of the page if it's not it will move in a strange way
//   // because s1coords.top it cumpute the pxels from the viweport not the main page
//   // so to slove that problem we will add the pxels that we were scrolled
//   //👇👇

//   //   window.scroll(
//   //     s1coords.left + window.pageXOffset,
//   //     s1coords.top + window.pageYOffset
//   //   );
//   // });

//   // after we solve this problem by this solution 👆👆👆
//   // we still need the smoothness of the scrolling

//   // window.scroll({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   // SO all these solutions are the old school way
//   // we have a modren way and easier way to do the same thing 👇👇

//   section1.scrollIntoView({ behavior: 'smooth' }); //🟢

//   // 📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗
//   // 📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗
// });

//***************************************************** types of events and event handlers **************************************************
// // 📗📗📗📗📗📗📗📗📗📗📗📗📗
// // Steps to make an event and remove it after it's done :

// // first: you should got a named function and then pass it into the event
// // because you should write the removeEventListener inside of it

// const h1 = document.querySelector('h1');

// const alterH1 = function () {
//   alert('addEventListener: Great! You are reading the heading :D');

//   // h1.removeEventListener('mouseenter', alterH1);
// };

// h1.addEventListener('mouseenter', alterH1);

// // we have another way to do this 👆👆👆👆
// // the way is to settimer and agter this timer it will be removed👇👇👇👇
// // setTimeout(() => h1.removeEventListener('mouseenter', alterH1), 1000);

// //***************************************************** event propagation: Bubbling and Capturing  **************************************************

// creating rgb(255.255.255)

// header.style.backgroundColor = 'rgb(213,45,100)'; <----- how to change the color by using rgb

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });
//************************************************************************************************************************************************************************************************************************************** */
//**************************************************************************************************************************************************************************************************************************************

// // dom traversing

// const h1 = document.querySelector('h1');

// //Going downwards: child🟢
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// // h1.firstElementChild.style.color = 'red';
// // h1.lastElementChild.style.color = 'orange';

// console.log(h1.firstChild); // get the context
// console.log(h1.firstElementChild); // get the html sintax

// // Going upwards: parents🟢
// console.log(h1.parentNode);

// console.log(h1.parentElement);

// console.log(h1.closest('.header'));

// // 🟢🔴 The closest() method searches up the DOM tree for the closest element which matches .
// //  It starts at the element itself, then tests the parent,
// //  grandparent, and so on until a match is found. If a match is not found, this method returns null.
// // 🔴🟢

// console.log(h1.nextElementSibling);
// console.log(h1.previousElementSibling);
//************************************************************************************************************************************************************************************************************************************** */
//**************************************************************************************************************************************************************************************************************************************

//
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   e.returnValue = '';
// });
