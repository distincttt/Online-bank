import "vue-router";

export type LayoutType = "main" | "auth";

declare module "vue-router" {
   interface RouteMeta {
      layout: LayoutType;
      auth: boolean;
   }
}

export enum RouteName {
   Home = "Home",
   Help = "Help",
   Auth = "Auth",
   Registration = "Registration",
   Request = "Request",
}

export type QueryMessage = string | undefined;
