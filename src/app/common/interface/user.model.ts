  export interface User {
    id: number | string;
    name: string;
    city: string;
    email: string;
    mobile: string;
    country: string;
    age:string;
  }

  export interface UserCreate {
    name: string;
    city: string;
    email: string;
    mobile: string;
    country: string;
    age:string;
  }

  export interface UserCount {
    totalUsers: number;
    activeUsers: number;
    oldAgeUsers: number;
    youngUsers: number;
    inActiveUsers: number;
  }

  
  