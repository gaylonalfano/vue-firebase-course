import { Timestamp, FieldValue } from "@firebase/firestore-types";

export default interface Playlist {
  id?: string;
  coverImagePath: string;
  coverImageUrl: string;
  createdAt: Timestamp | FieldValue;
  description: string;
  songs: string[];
  title: string;
  userId: string;
  userName: string;
}
