import React, { useState } from 'react';
import { products } from './data/products';

// Componente do Carrinho
function CartComponent() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const addItem = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    setCartCount(cartCount + 1);
    alert(`✅ ${product.nome} adicionado ao carrinho!`);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setCartCount(cartCount - 1);
  };

  const total = cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);

  const handleWhatsApp = () => {
    let message = `🛒 *PEDIDO PRESTIGE VISUAL*%0A%0A`;
    message += `*PRODUTOS:*%0A`;
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.nome} - R$ ${(item.preco * item.quantity).toFixed(2)}%0A`;
    });
    message += `%0A📦 *TOTAL:* R$ ${total.toFixed(2)}%0A`;
    window.open(`https://wa.me/5511922018290?text=${message}`, '_blank');
  };

  if (!showCart) {
    return (
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setShowCart(true)} 
          className="relative bg-primary text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          🛒 Carrinho
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Meu Carrinho</h2>
          <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        
        {cart.length === 0 ? (
          <p className="text-center py-8 text-gray-500">Carrinho vazio</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="flex gap-3 mb-4 pb-4 border-b">
                <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.nome}</h4>
                  <p className="text-sm text-gray-500">R$ {item.preco.toFixed(2)}</p>
                  <p className="text-sm">Quantidade: {item.quantity}</p>
                </div>
                <div className="font-semibold">R$ {(item.preco * item.quantity).toFixed(2)}</div>
                <button onClick={() => removeItem(index)} className="text-red-500 text-sm">Remover</button>
              </div>
            ))}
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span className="text-primary">R$ {total.toFixed(2)}</span>
              </div>
              <button onClick={handleWhatsApp} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
                💬 Finalizar pelo WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Componente de Login
function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'cliente@prestigecvisual.com.br' && senha === '123456') {
      setIsLoggedIn(true);
      setUserName('Cliente');
      onClose();
    } else if (email === 'vendedor@prestigecvisual.com.br' && senha === '123456') {
      setIsLoggedIn(true);
      setUserName('Vendedor');
      onClose();
    } else if (email === 'admin@prestigecvisual.com.br' && senha === '123456') {
      setIsLoggedIn(true);
      setUserName('Administrador');
      onClose();
    } else {
      setError('E-mail ou senha inválidos');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Entrar</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 border rounded-lg mb-3" 
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            className="w-full p-3 border rounded-lg mb-4" 
            required 
          />
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
            Entrar
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Demo: cliente@prestigecvisual.com.br / 123456
        </p>
      </div>
    </div>
  );
}

// Header
function Header({ isLoggedIn, userName, onLogout, onShowLogin }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Prestige Visual</h1>
          <p className="text-sm text-gray-500">Comunicação Visual e Gráfica</p>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Olá, {userName}</span>
              <button onClick={onLogout} className="text-red-500 hover:text-red-700 text-sm">Sair</button>
            </div>
          ) : (
            <button onClick={onShowLogin} className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition">
              Entrar
            </button>
          )}
          <CartComponent />
        </div>
      </div>
    </header>
  );
}

// Card do Produto
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.imagem} alt={product.nome} className="w-full h-48 object-cover" />
      <div className="p-4">
        {product.badge && (
          <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full mb-2">
            {product.badge}
          </span>
        )}
        <p className="text-xs text-gray-400 font-mono">{product.sku}</p>
        <h3 className="font-bold text-lg mt-1">{product.nome}</h3>
        <p className="text-gray-500 text-sm mt-2">{product.descricao.substring(0, 80)}...</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-primary">
            R$ {product.preco.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Adicionar 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

// Página Home
function Home({ onAddToCart }) {
  const categories = ['todos', ...new Set(products.map(p => p.categoria))];
  const [selectedCategory, setSelectedCategory] = useState('todos');
  
  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(p => p.categoria === selectedCategory);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossos Produtos</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Qualidade e personalização em acrílico para sua empresa.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full capitalize transition ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'todos' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-12">Nenhum produto nesta categoria.</p>
      )}
    </main>
  );
}

// App Principal
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setShowLogin(false);
  };

  return (
    <div>
      <Header 
        isLoggedIn={isLoggedIn} 
        userName={userName} 
        onLogout={handleLogout} 
        onShowLogin={handleLogin} 
      />
      <Home onAddToCart={handleAddToCart} />
      
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;