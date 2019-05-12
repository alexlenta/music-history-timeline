document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
});

// get references to elements to animate
let leftListToCheck = [...document.querySelectorAll('.from-left-art')];
let rightListToCheck = [...document.querySelectorAll('.from-right-art')];
let pipeListToCheck = [...document.querySelectorAll('#green-pipe rect')];

// window scroll handler
const handleWindowScroll = () => {
  const doneLeftList = checkList(
    leftListToCheck,
    'with-come-in-from-left-animation'
  );
  const doneRightList = checkList(
    rightListToCheck,
    'with-come-in-from-right-animation'
  );
  const donePipeList = checkList(pipeListToCheck, 'with-fill-animation');

  // if no more to animate, remove scroll listener
  if (doneLeftList && doneRightList && donePipeList) {
    window.removeEventListener('scroll', handleWindowScroll);
  }
};

// add listener
window.addEventListener('scroll', handleWindowScroll);

// check if elements are in viewport,
// if yes => add animation and remove from the list to not be checked again
const checkList = (list, animation) => {
  if (!list.length) return true;

  const listRemaining = [];
  const listInView = list.filter(elem => {
    if (isInViewport(elem)) {
      return true;
    }

    listRemaining.push(elem);
    return false;
  });

  list = [...listRemaining];

  listInView.forEach(elem => {
    elem.classList.add(animation);
  });

  return false;
};

// check if element is in viewport
const isInViewport = elem => {
  const distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
};
