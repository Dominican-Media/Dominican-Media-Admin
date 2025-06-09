export type modalGenericType = {
  [key: string]: boolean;
};

export type blogItemType = {
  image: string;
  title: string;
  caption: string;
  category: string;
};

export type navItemTypes = {
  title: string;
  route?: string;
  isActive?: boolean;
  description?: string;
  id?: string;
  isBordered?: boolean;
};

export type requestType = {
  isLoading: boolean;
  data: any;
  error: any;
  id?: string;
};

export type userType = {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

export type servicesType = {
  title: string;
  description: string;
  image: string | null | File;
  _id?: string;
};
