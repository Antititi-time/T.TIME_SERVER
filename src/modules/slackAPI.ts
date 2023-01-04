import axios from 'axios';
import config from '../config';

export const sendMessageToSlack = async (message: string) => {
  try {
    await axios.post(config.webhookURL, { text: message });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
