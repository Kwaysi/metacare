import { Request } from 'express';

export type Comment = {
  id: string;
  movieId: string;
  comment: string;
  ipAddress: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type CreateErr = (message: string, code?: number, validations?: object) => Error;

export type FullRequest = Request & {
  user: { [key: string]: any };
  destination?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
  };
};

export type AppError = Error & {
  code: number;
  name?: string;
  message: string;
  validations?: object | null;
};

export type Fix = any;
