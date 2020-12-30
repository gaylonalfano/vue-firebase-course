// import { FirestoreTimestamp } from "@/firebase/config";

export default interface Post {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  // createdAt: FirestoreTimestamp;
}
