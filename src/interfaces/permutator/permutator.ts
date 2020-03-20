export interface ObjShape {
  [key: number]: ElemShape;
}
export interface ElemShape {
  [key: number]: boolean | null;
}
