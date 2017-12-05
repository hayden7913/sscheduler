import * as actions from '../actions/indexActions';

export const Cards = (state = [], action) => {
  switch(action.type) {
    case actions.FETCH_TEST_DATA_SUCCESS:
      return action.Cards;
  }
  return state;
}

export const currentProjectInfo = (state = {}, action) => {
  if (action.type === actions.FECTCH_PROJECT_BY_ID_SUCCESS) {
      return {
        name: action.project.name,
        id: action.project._id
      }
  }
  
  return state;
}

/*
export const projectList = (state = [], action) => {
  switch(action.type){
    case(actions.FETCH_PROJECTS_SUCCESS):
      return action.projects;
      break;
    case(actions.DELETE_PROJECT_SUCCESS):
      
  }
}*/