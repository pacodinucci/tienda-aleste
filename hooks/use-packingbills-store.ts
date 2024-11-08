import { create } from "zustand";

interface Product {
  productId: string;
  stock: number;
}

interface Packingbill {
  id: string;
  packingbillNumber: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

interface PackingbillState {
  packingbills: Packingbill[];
  addPackingbill: (newPackingbill: Packingbill) => void;
  updatePackingbill: (
    id: string,
    updatedPackingbill: Partial<Packingbill>
  ) => void;
  removePackingbill: (id: string) => void;
}

export const usePackingbillStore = create<PackingbillState>((set) => ({
  packingbills: [],

  addPackingbill: (newPackingbill) =>
    set((state) => ({
      packingbills: [...state.packingbills, newPackingbill],
    })),

  updatePackingbill: (id, updatedPackingbill) =>
    set((state) => ({
      packingbills: state.packingbills.map((pb) =>
        pb.id === id ? { ...pb, ...updatedPackingbill } : pb
      ),
    })),

  removePackingbill: (id) =>
    set((state) => ({
      packingbills: state.packingbills.filter((pb) => pb.id !== id),
    })),
}));
