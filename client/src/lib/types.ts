// client/src/lib/types.ts
import type { AxiosRequestHeaders } from "axios";

export interface AuthHeaders extends AxiosRequestHeaders {
  Authorization?: string;
}
