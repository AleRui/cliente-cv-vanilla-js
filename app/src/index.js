/**
 * JS Project Client CV
 */
import { getTokenWithAxios, getDataWithAxios } from './services/service-api-cv'

/* CSS */
import 'bootstrap';
import './scss/style.scss'

const languaje = 'es';

document.addEventListener('DOMContentLoaded', function () {
  getTokenWithAxios()
    .then(token => {
      if (token !== '' && token !== undefined && token !== null) {
        getDataWithAxios('api/usercv/' + 1, token).then(data => {
          console.log(data)
          addPersonalInfoToDOM(data.name, 'Nombre');
          addPersonalInfoToDOM(data.phone, 'Phone');
          addPersonalInfoToDOM(data.email, 'Email');
          addPersonalInfoToDOM(data.github, 'Github');
          addWorkExperience(data.work_experiences);
          addStudies(data.studies);
        })
      } else {
        throw new Error('Invalid Token')
      }
    })
    .catch((error) => { console.log('Failed!', error) })
})

/**
 * Add to DOM the personal info.
 * @param {*} dataName 
 * @param {*} tagName 
 */
function addPersonalInfoToDOM(dataName, tagName) {
  if (
    document.getElementById("personal_info")
    && document.getElementById("personal_info") != ''
    && document.getElementById("personal_info") != undefined
    && document.getElementById("personal_info") != null
    && dataName
    && dataName != ''
    && dataName != undefined
    && dataName != null
  ) {
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = '<div>' + tagName + ': </div>'
      + '<div>' + dataName + '</div>';

    document.getElementById("personal_info").appendChild(div)
  } else {
    console.log('Doesn\'t exist personal_info id or dataName');
  }
}

/**
 * Add to DOM the Work Experiences.
 * @param {*} experienceData 
 */
function addWorkExperience(experienceData) {
  if (
    document.getElementById("work_experiences")
    && document.getElementById("work_experiences") != ''
    && document.getElementById("work_experiences") != undefined
    && document.getElementById("work_experiences") != null
    && experienceData
    && experienceData != ''
    && experienceData != undefined
    && experienceData != null
  ) {
    for (const item of experienceData) {
      let description = JSON.parse(item.description);
      let descriptionES = description.hasOwnProperty(languaje) ? description.es : '';
      
      const divToInsert = document.createElement('div');
      divToInsert.className = 'row work pt-5';
      divToInsert.innerHTML = '<div class="title"> · ' + item.job_title + '</div>'
        + '<div class="description">' + descriptionES + '</div>';
      document.getElementById("work_experiences").appendChild(divToInsert)
    }
  } else {
    console.log('Doesn\'t exist personal_info id or experienceData');
  }
}

/**
 * Add to DOM the Work Experiences.
 * @param {*} experienceData 
 */
function addStudies(studiesData) {
  if (
    document.getElementById("studies")
    && document.getElementById("studies") != ''
    && document.getElementById("studies") != undefined
    && document.getElementById("studies") != null
    && studiesData
    && studiesData != ''
    && studiesData != undefined
    && studiesData != null
  ) {
    for (const item of studiesData) {
      let description = JSON.parse(item.description);
      let descriptionES = description.hasOwnProperty(languaje) ? description.es : '';
      
      const divToInsert = document.createElement('div');
      divToInsert.className = 'row study pt-5';
      divToInsert.innerHTML = '<div class="title">'
          + item.begin_at + ' - ' + item.finish_at + ' | '
          + item.study_title
        + '</div>'
        + '<div class="description">' + descriptionES + '</div>';
      document.getElementById("studies").appendChild(divToInsert)
    }
  } else {
    console.log('Doesn\'t exist personal_info id or experienceData');
  }
}
