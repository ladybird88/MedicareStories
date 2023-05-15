'use strict';

// add arrows to nav items with children
const morelink = document.querySelectorAll('.more-link'),
    svgArrow = document.createElement('span');

svgArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"/></svg>`;

morelink.forEach(elem => {
    elem.append(svgArrow.cloneNode(true));
});

// Header screen
const headerScrollStart = document
        .querySelector('.js-header')
        .offsetTop,
    headerScrollStop = document
        .querySelector('.js-header')
        .offsetHeight + headerScrollStart,
    headerLogo = document.querySelector('.js-logo'),
    headerMenu = document.querySelector('.js-menu');

window.addEventListener('scroll', () => {
    if (this.scrollY > (headerScrollStop / 3)) {
        headerLogo
            .classList
            .add('small');
        headerMenu
            .classList
            .add('colored');
    } else {
        headerLogo
            .classList
            .remove('small');
        headerMenu
            .classList
            .remove('colored');
    }
});

// Napkins moving

const napkins = document.querySelectorAll('.js-napkin');

napkins.forEach(elem => {
    var isDown = false,
        offset = [0, 0];

    elem.addEventListener('mousedown', function (e) {
        isDown = true;
        offset = [
            elem.offsetLeft - e.clientX,
            elem.offsetTop - e.clientY
        ];
    }, true);

    elem.addEventListener('touchstart', function (e) {
        isDown = true;
        offset = [
            elem.offsetLeft - e.touches[0].clientX,
            elem.offsetTop - e.touches[0].clientY
        ];
    }, true);

    elem.addEventListener('mouseup', endMoving, true);
    elem.addEventListener('touchend', endMoving, true);

    document.addEventListener('mousemove', function (event) {
        event.preventDefault();
        if (isDown) {
            let mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            elem.style.left = (mousePosition.x + offset[0]) + 'px';
            elem.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);

    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
        if (isDown) {
            let touchPosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
            elem.style.left = (touchPosition.x + offset[0]) + 'px';
            elem.style.top = (touchPosition.y + offset[1]) + 'px';
        }
    }, true);

    function endMoving() {
        isDown = false;
    }
});

// Horizontal scroll content
const horizontalScrollContainer = document.querySelectorAll('.js-horizontal-scroll');

horizontalScrollContainer.forEach(item => {
    const horizontalItems = item.querySelector('.js-horizontal-items');

    window.addEventListener("scroll", function () {
        horizontalScroll(item, horizontalItems);
    });
});

function horizontalScroll(parent, items) {
    let y = window.scrollY - parent.offsetTop;
    items.scrollTo({left: y});

    if (parent.classList.contains('approaches') && y > 0) {
        document
            .querySelector('.neon-arrow-scroll')
            .hidden = true;
        document
            .querySelector('.js-neon-arrow')
            .classList
            .add('visible');
    } else {
        document
            .querySelector('.neon-arrow-scroll')
            .hidden = false;
        document
            .querySelector('.js-neon-arrow')
            .classList
            .remove('visible');
    }
};

// Parallax elements

const parallaxElements = document.querySelectorAll('.js-photos-item'),
    parallaxElementsStart = document
        .querySelector('.js-photos')
        .offsetTop;

function parallaxPhotos(elem, scrollYVal) {
    const dataScrollY = elem.getAttribute('data-initial-scroll');
    elem.style.transform = 'translate3d(0px ,' + -(scrollYVal / dataScrollY) + '%, 0px)'
}

function parallaxInitElem(elem) {
    const dataScrollY = elem.getAttribute('data-initial-scroll');
    elem.style.transform = 'translate3d(0px ,' + dataScrollY + '%, 0px)'
}

parallaxElements.forEach(item => {
    parallaxInitElem(item);

    window.addEventListener('scroll', function () {
        if ((this.scrollY + (this.innerHeight * 0.8)) > parallaxElementsStart) {
            let indexScroll = this.scrollY - parallaxElementsStart;
            parallaxPhotos(item, indexScroll);
        } else {
            return;
        }
    });
});

//Parallax image inside container on mouemove
const parallaxImgContainer = document.querySelectorAll('.js-photo-parallax');

parallaxImgContainer.forEach(item => {
    const img = item.querySelector('img');
    img.addEventListener('mousemove', function (event) {
        const widthContainer = item.offsetWidth,
            heightContainer = item.offsetHeight;
        let xPos = event.clientX,
            yPos = event.clientY,
            xShift = ((widthContainer / 2 - xPos) / widthContainer * 2) * 2,
            yShift = ((heightContainer / 2 - yPos) / heightContainer * 2) * 2;

        img.style.transform = 'translate3d(' + xShift + '%, ' + yShift + '%, ' + 0 + ') scale(1.1)';
    });
})

// Money bug animation

const moneyBugContainer = document.querySelector('.js-money-bug-container'),
      moneyBug = moneyBugContainer.querySelector('.js-money-bug'),
      moneyLines = moneyBugContainer.querySelectorAll('.js-money-line'),
      moneyBugStart = moneyBugContainer.offsetTop,
      moneyBugContainerHeight = moneyBugContainer.offsetHeight;

var initialHeightArray = [],
    initialTopArray = [];
moneyLines.forEach((item) => {
  const initialHeight = item.offsetHeight,
        itemTop = item.offsetTop;
  initialHeightArray.push(initialHeight);
  initialTopArray.push(itemTop);
});     

window.addEventListener('scroll', function () {
    let percentVal,
        centerWindow = this.scrollY + (this.innerHeight / 2);
    if (centerWindow < moneyBugStart) {
        percentVal = 1;
    } else if (centerWindow < (moneyBugStart + moneyBugContainerHeight / 4)) {
        percentVal = (centerWindow - moneyBugStart) / moneyBugContainerHeight * 100;
    } else {
        percentVal = 100;
    }

    moneyLines.forEach((item, i) => {
      const itemHide = initialTopArray[i] + initialHeightArray[i] + 200;

      console.log(initialTopArray[i]*1.5);

      if ((centerWindow - moneyBugStart) > initialTopArray[i] && (centerWindow - moneyBugStart) < itemHide) {
        item.style.height = `${initialHeightArray[i]}px`;
        item.style.top = `${initialTopArray[i]*1.8}px`;
        item.classList.remove('bg-hidden')
      } else if ((centerWindow - moneyBugStart) >= itemHide){
        item.style.height = `${initialHeightArray[i]}px`;
        item.classList.add('bg-hidden');
        
      } else {
        item.style.height = '0px';
        item.style.top = `${initialTopArray[i]}px`; 
      }
    });

    

    movingBug(percentVal);
});

function movingBug(percent) {
    let scaleVal = 0.5 + (percent * 0.5 / 100),
        rotateVal = -45 + (percent * 45 / 100);
    moneyBug.style.transform = `translate(-50%, -50%) scale(${scaleVal}) rotate(${rotateVal}deg) `;
}

// Ball slides on line

const scrollContent = document.querySelector('.scroll-container'),
    scrollContentHeight = scrollContent.scrollHeight,
    path = document.getElementById('uncert__timeline__passed'),
    obj = document.getElementById('obj'),
    pathLength = Math.floor(path.getTotalLength()),
    verticalScrollStart = scrollContent.offsetTop,
    verticalScrollStop = scrollContentHeight + verticalScrollStart;

// Move obj element along path based on percentage of total length
function moveObj(prcnt) {
    prcnt = (prcnt * pathLength) / 100;
    console.log(prcnt);
    // Get x and y values at a certain point in the line
    pt = path.getPointAtLength(prcnt);
    pt.x = Math.round(pt.x);
    pt.y = Math.round(pt.y);

    obj.style.transform = 'translate3d(' + pt.x + 'px,' + pt.y + 'px, 0)';
    path.setAttribute('stroke-dashoffset', (pathLength - prcnt));
}

// Initialize moveObj(0); Scroll functionality

/*scrollContent.addEventListener('scroll', function() {
  console.log(this.scrollY);
  let percentValue = (this.scrollY / (scrollContentHeight - window.innerHeight)) * 100;
  console.log(percentValue);
  moveObj(percentValue);
});*/

window
    .addEventListener('scroll', function () {

        let percentValue = (this.scrollY / (scrollContentHeight - window.innerHeight)) * 10;
        // console.log(percentValue); moveObj(percentValue);
    });