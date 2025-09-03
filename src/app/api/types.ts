export interface Event {
  id: string;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  location: string;
  price: number;
  capacity: number;
  tags: string[];
  image: string;
  status: string;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ORGANIZER" | "ADMIN";
}


