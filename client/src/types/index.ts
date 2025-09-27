

export interface Usuario {
    id: string;
    fullname: string;
    email: string;
    country: string;
    address: string;
    phone?: string;
  }
  
  export interface Pais {
    code: string;
    name: string;
    flag: string;
  }
  
  
  export interface FormularioData {
    fullname: string;
    country: string;
    address: string;
  }

  export interface ApiError {
    message: string;
    status?: number;
  }
  