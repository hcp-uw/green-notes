// declare module "*.jpg";
declare module "*.png";
declare module '*.svg' {
    const value: any;
    export = value;
  }
