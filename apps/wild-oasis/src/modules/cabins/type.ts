export type CabinBasicT = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
};

// Cabin 获取数据
export type CabinDataT = CabinBasicT & {
  id: number;
  image: string;
};
// Cabin 更新数据
export type CabinParamT = CabinBasicT & {
  id?: number;
  image: File | string;
};
// Cabin 表单数据
export type CabinFormT = CabinBasicT & {
  image: File[] | string;
};
