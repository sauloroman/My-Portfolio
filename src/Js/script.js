// #########################
// SELECTORS
// #########################

const menuLogoEl = document.querySelector('#menu-logo');
const menuEl = document.querySelector('#menu');
const experienceElems = document.querySelectorAll('.experience__item');
const sectionProjeEl = document.querySelector('.section-projects');
const imagesProjeEls = document.querySelectorAll('.gallery__imgBox');
const projectInfoContaEl = document.querySelector('.project__infoBox');

// #########################
// FUNCTIONS
// #########################

const showCloseMenu = function() {
  menuLogoEl.classList.toggle('close');
  menuEl.classList.toggle('close');
}

const openExperience = function( experience ) {
  const body = experience.querySelector('.experience__content');
  const header = experience.querySelector('.experience__header');

  body.classList.toggle('open');
  header.classList.toggle('open');
}

const cleanContainer = function() {
  while( projectInfoContaEl.firstElementChild ) {
    projectInfoContaEl.removeChild( projectInfoContaEl.firstElementChild );
  }
}

const createProject = function( id ) {

  cleanContainer();

  const [targetProject] = projects.filter( project => project.id === id);
  
  const projectContainer = document.createElement('DIV');
  projectContainer.classList.add('project__info');

  const {projectName, description, image1, image2, image3, image4, image5, image6, gitHubUrl, liveUrl} = targetProject;


  projectContainer.innerHTML = `
    <header>
      <h3>${ projectName }</h3>
    </header>

    <p>
     ${ description }
    </p>

    <div class="project-slides">
      <img src=${image1} alt="Desktop project view" />
      <img src=${image2} alt="Desktop project view" />
      <img src=${image3} alt="Desktop project view" />
      <img src=${image4} alt="Desktop project view" />
      <img src=${image5} alt="Desktop project view" />
      <img src=${image6} alt="Desktop project view" />
    </div>

    <div class="project__buttons">
      <a class="btn btn--blue" href=${gitHubUrl} >Ver GitHub</a>
      <a class="btn btn--blue" target="_blank" href=${liveUrl}>Ver Online 🔴</a>
    </div>
  `;

  const buttonClose = document.createElement('BUTTON');
  buttonClose.innerHTML = `
    <ion-icon class="project__close" name="close-outline"></ion-icon>
  `;

  buttonClose.onclick = () => sectionProjeEl.classList.remove('close'); 

  projectContainer.querySelector('header').appendChild(buttonClose);


  projectInfoContaEl.appendChild( projectContainer );

}

const showModal = function( e ) {
  e.preventDefault();

  const selectedProject = e.target.parentElement.getAttribute('data-id');

  sectionProjeEl.classList.add('close');
  
  createProject( selectedProject );
}

// #########################
// EVENT LISTENERS
// #########################

eventListeners();

function eventListeners() {

  menuLogoEl.addEventListener('click', showCloseMenu );

  experienceElems.forEach( experience => {
    experience.addEventListener('click', () => openExperience( experience ) );
  });

  imagesProjeEls.forEach( image => {
    image.addEventListener('click', showModal )
  });

}

// #######################################
// Arreglando el gap en algunas versiones de Safari
// #######################################
function checkFlexGap() {
  let flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  let isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();