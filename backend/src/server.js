const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { supabase } = require('./supabaseClient');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from admin dashboard
app.use(express.static(path.join(__dirname, '..', '..', 'admin-dashboard')));

// Mock data for demonstration
const menuItems = [
  {
    id: 1,
    name: 'Шашлык из свинины',
    description: 'Нежное свиное мясо, маринованное в секретном соусе по семейному рецепту',
    price: 350,
    weight: '100 г',
    category: 'Шашлыки',
    image: 'https://images.unsplash.com/photo-1612365162249-3a2dd0d1e6e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cookingTime: '25 мин',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Шашлык из говядины',
    description: 'Отборная говядина, приготовленная на углях до совершенства',
    price: 420,
    weight: '100 г',
    category: 'Шашлыки',
    image: 'https://images.unsplash.com/photo-1634233961945-7d3ecd94e750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cookingTime: '30 мин',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Люля-кебаб',
    description: 'Традиционные люля-кебаб из баранины с ароматными специями',
    price: 380,
    weight: '150 г',
    category: 'Шашлыки',
    image: 'https://images.unsplash.com/photo-1618698045872-55731a4d7f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cookingTime: '20 мин',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Салат Овощной',
    description: 'Свежие овощи с домашней заправкой',
    price: 150,
    weight: '200 г',
    category: 'Салаты',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cookingTime: '5 мин',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Картофель по-деревенски',
    description: 'Ароматный картофель, запеченный на углях',
    price: 120,
    weight: '150 г',
    category: 'Гарниры',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cookingTime: '25 мин',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Комбо-набор',
    description: 'Шашлык из свинины, картофель, салат и соус на выбор',
    price: 550,
    weight: '500 г',
    category: 'Комбо',
    image: 'https://images.unsplash.com/photo-1573462910101-15e180c90ba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cookingTime: '35 мин',
    rating: 4.9,
  },
];

const orders = [
  {
    id: 'SH-2023-00123',
    userId: 1,
    items: [
      { menuItemId: 1, quantity: 2, price: 350 },
      { menuItemId: 4, quantity: 1, price: 150 },
    ],
    total: 850,
    status: 'готово',
    createdAt: '2023-10-15T14:30:00Z',
    estimatedDelivery: '2023-10-15T15:15:00Z',
    deliveryAddress: 'ул. Ленина, 25, кв. 10',
  }
];

// Registration endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    
    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone
        }
      }
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    // Also insert user data into the users table
    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email,
            name,
            phone
          }
        ]);
      
      if (userError) {
        console.error('User data insert error:', userError);
        // Don't return error here as the auth registration was successful
      }
    }
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: data.user 
    });
  } catch (error) {
    console.error('Registration exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ 
      message: 'Login successful', 
      session: data.session, 
      user: data.user 
    });
  } catch (error) {
    console.error('Login exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/user/profile', async (req, res) => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (userError) {
      return res.status(400).json({ error: userError.message });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.get('/api/menu/:id', (req, res) => {
  const menuItem = menuItems.find(item => item.id == req.params.id);
  if (!menuItem) {
    return res.status(404).json({ message: 'Menu item not found' });
  }
  res.json(menuItem);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(order => order.id === req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = {
      userId: req.body.userId || null,
      items: req.body.items,
      total: req.body.total,
      status: 'принят',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
      deliveryAddress: req.body.deliveryAddress,
    };
    
    // Insert order into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([newOrder])
      .select();
    
    if (error) {
      console.error('Order creation error:', error);
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Order creation exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/user/loyalty', (req, res) => {
  // Mock loyalty data
  res.json({
    points: 1250,
    level: 'regular',
    nextLevel: 'vip',
    nextLevelPoints: 2000,
    benefits: [
      '5% бонусов от суммы заказа',
      'Скидка 20% в день рождения',
      'Бесплатная доставка от 1000₽',
      'Доступ к эксклюзивным блюдам'
    ]
  });
});

// Serve admin dashboard for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'admin-dashboard', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Шашлык-Машлык backend server running on port ${PORT}`);
  console.log(`Admin dashboard available at http://localhost:${PORT}`);
});

module.exports = app;