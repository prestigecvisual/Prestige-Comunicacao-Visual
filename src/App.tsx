import { useState } from 'react';

interface Product {
  id: number;
  sku: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  categoria: string;
  badge?: string;
}

const products: Product[] = [
  { id: 1, sku: "EXP-L-A6-ACR", nome: "Display L A6 - Acrílico", preco: 29.90, descricao: "Display inclinado 75° para cardápios", imagem: "https://placehold.co/400x300/7c3aed/white?text=Display+L+A6", categoria: "Displays", badge: "Mais vendido" },
  { id: 2, sku: "EXP-L-A5-ACR", nome: "Display L A5 - Acrílico", preco: 49.90, descricao: "Display para promoções", imagem: "https://placehold.co/400x300/7c3aed/white?text=Display+L+A5", categoria: "Displays" },
  { id: 3, sku: "URN-CUB-M", nome: "Urna Cubo Média 20cm", preco: 189.90, descricao: "Urna para sorteios com fechamento para cadeado", imagem: "https://placehold.co/400x300/7c3aed/white?text=Urna+Cubo", categoria: "Urnas", badge: "Mais vendido" },
  { id: 4, sku: "CHV-RET-2F", nome: "Chaveiro Retangular 2 Faces", preco: 36.00, descricao: "Chaveiro personalizado em acrílico", imagem: "https://placehold.co/400x300/7c3aed/white?text=Chaveiro", categoria: "Chaveiros" },
  { id: 5, sku: "PLA-AC3-3020", nome: "Placa ACM 30x20cm", preco: 89.90, descricao: "Placa para consultórios", imagem: "https://placehold.co/400x300/7c3aed/white?text=Placa+ACM", categoria: "Placas" },
  { id: 6, sku: "PUL-AC10-CL", nome: "Púlpito Clássico 115cm", preco: 1800.00, descricao: "Púlpito em acrílico", imagem: "https://placehold.co/400x300/7c3aed/white?text=Pulpito", categoria: "Púlpitos" },
  { id: 7, sku: "BAL-MDF-100", nome: "Balcão Desmontável 100cm", preco: 1800.00, descricao: "Balcão para eventos", imagem: "https://placehold.co/400x300/7c3aed/white?text=Balcao", categoria: "Balcões", badge: "Mais vendido" },
  { id: 8, sku: "TRO-MIX-M", nome: "Troféu Mix Médio", preco: 89.90, descricao: "Troféu multicamadas", imagem: "https://placehold.co/400x300/7c3aed/white?text=Trofeu", categoria: "Troféus" }
];

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = ['todos', ...new Set(products.map(p => p.categoria))];
  const filteredProducts = selectedCategory === 'todos' ? products : products.filter(p => p.categoria === selectedCategory);
  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.preco, 0);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert(`✅ ${product.nome} adicionado!`);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleWhatsApp = () => {
    let msg = `🛒 *PEDIDO PRESTIGE VISUAL*%0A%0A`;
    cart.forEach(item => msg += `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`);
    msg += `%0A📦 *TOTAL:* R$ ${cartTotal.toFixed(2)}%0A`;
    window.open(`https://wa.me/5511922018290?text=${msg}`, '_blank');
  };

  if (showCart) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button onClick={() => setShowCart(false)} className="text-primary mb-4">← Voltar</button>
          <h1 className="text-3xl font-bold mb-6">Meu Carrinho</h1>
          {cart.length === 0 ? <p>Carrinho vazio</p> : (
            <>
              {cart.map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow mb-2 flex justify-between">
                  <div><h3>{item.nome}</h3><p>R$ {item.preco.toFixed(2)}</p></div>
                  <button onClick={() => removeFromCart(i)} className="text-red-500">Remover</button>
                </div>
              ))}
              <div className="bg-white p-4 rounded-lg shadow mt-4">
                <div className="flex justify-between font-bold text-xl"><span>Total:</span><span>R$ {cartTotal.toFixed(2)}</span></div>
                <button onClick={handleWhatsApp} className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg">💬 WhatsApp</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div><h1 className="text-2xl font-bold text-primary">Prestige Visual</h1><p className="text-sm">Comunicação Visual e Gráfica</p></div>
          <button onClick={() => setShowCart(true)} className="relative bg-primary text-white px-4 py-2 rounded-lg">
            🛒 Carrinho
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs">{cartCount}</span>}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12"><h2 className="text-4xl font-bold mb-4">Nossos Produtos</h2></div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              {cat === 'todos' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(prod => (
            <div key={prod.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={prod.imagem} alt={prod.nome} className="w-full h-48 object-cover" />
              <div className="p-4">
                {prod.badge && <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{prod.badge}</span>}
                <p className="text-xs text-gray-400 mt-1">{prod.sku}</p>
                <h3 className="font-bold text-lg">{prod.nome}</h3>
                <p className="text-gray-500 text-sm">{prod.descricao}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-primary">R$ {prod.preco.toFixed(2)}</span>
                  <button onClick={() => addToCart(prod)} className="bg-primary text-white px-4 py-2 rounded-lg">Adicionar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}