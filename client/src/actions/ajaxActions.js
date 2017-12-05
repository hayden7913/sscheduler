import { projectsUrl } from '../config/endpointUrls';
import { Route, hashHistory } from 'react-router';
import store from 'reduxFiles/store';

const url = 'testRouter';

export const FETCH_TEST_DATA_SUCCESS = 'FETCH_TEST_DATA_SUCCESS'; 
export const fetchCardsSuccess = (Cards) => ({
  type: 'FETCH_TEST_DATA_SUCCESS',
  Cards
});

export function fetchCards() {
  return (dispatch) => {
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      dispatch(fetchCardsSuccess(data));
    })
    .catch(err => {
      console.error(err)
    })
  }
}

export const FECTCH_PROJECT_BY_ID_SUCCESS = 'FECTCH_PROJECT_BY_ID_SUCCESS'; 
export const fetchProjectByIdSuccess = (project) => ({
  type: 'FECTCH_PROJECT_BY_ID_SUCCESS',
  project
});

export function fetchProjectById(projectId, currentRoute) {
  const projectUrl = `${projectsUrl}/${projectId}`
  return (dispatch) => {
    fetch(projectUrl)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      dispatch(fetchProjectByIdSuccess(data));
      const designRoute =`/design/${projectId}`;
      
      if(currentRoute !== designRoute){
        hashHistory.push(designRoute)
      }
    })
    .catch(err => {
      console.error(err)
    })
  }
}

export const POST_NEW_PROJECT_SUCCESS = 'POST_NEW_PROJECT_SUCCESS'; 
export const postNewProjectSuccess = (modules) => ({
  type: 'POST_NEW_PROJECT_SUCCESS',
  modules
});

export function postNewProject(newProject) {
  return (dispatch) => {
    fetch(
      projectsUrl,
      {
          method: "POST",
          body: JSON.stringify(newProject),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        const projectId = data._id;
        
        dispatch(fetchProjectById(projectId));
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS'; 
export const updateProjectSuccess = (modules) => ({
  type: 'UPDATE_PROJECT_SUCCESS',
  modules
});

export function updateProject(data, projectId) {
  return (dispatch) => {
    fetch(projectsUrl + projectId, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        alert(JSON.stringify(data));
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'; 
export const deleteProjectSuccess = (projectId, projects) => ({
  type: 'DELETE_PROJECT_SUCCESS',
  projectId
});

export function deleteProject(projectId, projects) {
  const url = `${projectsUrl}/${projectId}`
  return (dispatch) => {
    fetch(
      url,
      {
          method: "DELETE",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        
        dispatch(fetchProjects());
      })
      .catch(err => {
        console.error(err)
      })
  }
}