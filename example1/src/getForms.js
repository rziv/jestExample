//import getData from './getData'
import getData from './getData'
export const getForms = (url = "http://localhost:4000/forms") => {
  const getFormsList = (forms) => forms.map(form => form.name); 
  
  return getData(url)
    .then(({data}) => getFormsList(data))
    .catch(error => { throw new Error("Can't get forms"); })
}

