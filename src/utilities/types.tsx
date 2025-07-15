export type modalGenericType = {
  [key: string]: boolean;
};

export type queryObjectType = { [key: string]: string | number };

export type blogItemType = {
  image: null | File | string;
  title: string;
  description: string;
  caption: string;
  category: string[];
  type: string;
  content: string;
  facebookUrl: string;
  xUrl: string;
  instagramUrl: string;
  createdAt?: string | Date;
  previewImage?: string | null;
  isFeatured: boolean;
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
  image?: string | null | File;
  phone?: string;
  gender?: string;
  role?: string;
  password?: string;
  bio: string;
};

export type servicesType = {
  title: string;
  description: string;
  image: string | null | File;
  _id?: string;
};

export type blogCategoriesType = {
  _id: string;
  title: string;
};
