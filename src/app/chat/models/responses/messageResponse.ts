import { Timestamp } from 'firebase/firestore/lite';

export type MessageResponse = {
  message: string;
  name: string;
  timestamp: Timestamp;
};
