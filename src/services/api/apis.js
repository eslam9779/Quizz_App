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

export const getQuestions = (categoryId,amount,difficulty,type) => {
  
  return axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`)
    .then(response => response)
    .catch(error => {
      return {};
    });

}