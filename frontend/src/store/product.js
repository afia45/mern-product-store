import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  errorMessage: "",
  setProducts: (products) => set({ products }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (message) => set({ errorMessage: message }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      set({ isLoading: true });
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to create product.");
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      set({ errorMessage: error.message });
      return { success: false, message: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      set({ errorMessage: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product.");
      }

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      // Update the UI immediately without needing a refresh
      set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to update product.");
      }

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      // Update the UI immediately without needing a refresh
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
