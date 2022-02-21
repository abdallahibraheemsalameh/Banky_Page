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

