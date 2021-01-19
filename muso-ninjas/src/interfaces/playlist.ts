import { Timestamp, FieldValue } from "@firebase/firestore-types";
import Song from "@/interfaces/song";

export default interface Playlist {
  id?: string;
  coverImagePath: string;
  coverImageUrl: string;
  createdAt: Timestamp | FieldValue;
  description: string;
  songs: Song[];
  title: string;
  userId: string;
  userName: string;
}
