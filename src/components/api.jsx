import axios from 'axios';

export const askQuestion = async (question) => {
  
  try {
    const response = await axios.post('http://localhost:5000/ask-question', { question });
    return { question, answer: response.data.answer };
  } catch (error) {
    console.error('Error asking question:', error);
  }
};

export const uploadPdf = async (file) => {
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('http://localhost:5000/upload-pdf', formData);
    console.log("PDF uploaded:", response);
  } catch (error) {
    console.error('Error uploading PDF:', error);
  }
};
