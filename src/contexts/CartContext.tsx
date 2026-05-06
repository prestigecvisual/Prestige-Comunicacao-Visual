import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  produtoId: number;
  sku: string;
  nome: string;
  quantidade: number;
  preco_unitario: number;
  imagem: string;
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  cart: Cart;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'prestige_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return { items: [], total: 0 };
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + (item.preco_unitario * item.quantidade), 0);
  };

  const addItem = (item: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      const existingIndex = prev.items.findIndex(i => i.produtoId === item.produtoId);
      
      let newItems;
      if (existingIndex >= 0) {
        newItems = [...prev.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantidade: newItems[existingIndex].quantidade + item.quantidade
        };
      } else {
        newItems = [...prev.items, { ...item, id: crypto.randomUUID() }];
      }

      const newTotal = calculateTotal(newItems);
      return { items: newItems, total: newTotal };
    });
  };

  const removeItem = (id: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(item => item.id !== id);
      const newTotal = calculateTotal(newItems);
      return { items: newItems, total: newTotal };
    });
  };

  const updateQuantity = (id: string, quantidade: number) => {
    if (quantidade < 1) return;
    setCart(prev => {
      const newItems = prev.items.map(item =>
        item.id === id ? { ...item, quantidade } : item
      );
      const newTotal = calculateTotal(newItems);
      return { items: newItems, total: newTotal };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};