import axios from "axios";

export const getAllCategories = () => {
  return axios.get('https://opentdb.com/api_category.php')
    .then(response => response)  
    .catch(error => {
      return {}; 
    });
}
