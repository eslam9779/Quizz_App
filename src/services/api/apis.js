import axios from "axios";

export const getAllCategories = () => {
  return axios.get('https://opentdb.com/api_category.php')
    .then(response => response)
    .catch(error => {
      return {};
    });
}


export const getQuestionDetailsForCategory = (Category) => {

  return axios.get('https://opentdb.com/api_count.php?category=' + Category.id)
    .then(response => response)
    .catch(error => {
      return {};
    });

}