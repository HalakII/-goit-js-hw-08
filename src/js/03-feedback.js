import throttle from 'lodash.throttle';
const FFS_KEY = 'feedback-form-state';
const feedbackFormEl = document.querySelector('.feedback-form');
pageReload();
feedbackFormEl.addEventListener('submit', onFormSubmit);

feedbackFormEl.addEventListener('input', throttle(onInputFocus, 500));

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(feedbackFormEl);
  formData.forEach((value, name) => console.log(value, name));
  if (localStorage.getItem(FFS_KEY)) {
    localStorage.removeItem(FFS_KEY);
  }
  event.currentTarget.reset();
}

function onInputFocus(event) {
  let persistedFoormData = localStorage.getItem(FFS_KEY);
  persistedFoormData = persistedFoormData ? JSON.parse(persistedFoormData) : {};
  persistedFoormData[event.target.name] = event.target.value;
  localStorage.setItem(FFS_KEY, JSON.stringify(persistedFoormData));
  console.log(event.target);
}

function pageReload() {
  let persistedFoormData = localStorage.getItem(FFS_KEY);
  if (persistedFoormData) {
    persistedFoormData = JSON.parse(persistedFoormData);
    Object.entries(persistedFoormData).forEach(([name, value]) => {
      feedbackFormEl.elements[name].value = value;
    });
  }
  console.log(persistedFoormData);
}
