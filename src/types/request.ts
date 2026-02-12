export type RequestStatus = "active" | "cancelled" | "done" | "pending";

export type Request = {
   id?: string;
   name: string;
   sum: number;
   tel: string;
   status: RequestStatus;
};

export type RequestsState = {
   requests: Request[];
};

export type RequestFilterType = {
   name?: string;
   status?: RequestStatus;
};
