type Entry = {
  _id: string;
  uid: string;
  title: string;
  content: string;
  visibility: 'public' | 'private';
  createdAt: Date;
};

type UserPayload = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  createdAt: Date;
};

type AuthRequest = Request & {
  user?: UserPayload;
};

type EntryDocument = Entry & Document;

export type { UserPayload, AuthRequest, EntryDocument };
