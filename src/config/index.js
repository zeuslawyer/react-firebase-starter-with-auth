import { firebaseConfig } from './dev.secrets';
import envs from '../constants/envs';

if(process.env.NODE_ENV === envs.dev) {
  console.log("You are in: ", process.env);
}

export { firebaseConfig };
