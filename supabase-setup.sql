-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  weight TEXT,
  category TEXT,
  image_url TEXT,
  cooking_time TEXT,
  rating DECIMAL(3, 2)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'принят',
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  delivery_address TEXT
);

-- Create order_status enum type
CREATE TYPE order_status AS ENUM (
  'принят',
  'готовится',
  'готово',
  'в пути',
  'доставлено'
);

-- Update orders table to use enum
ALTER TABLE orders 
  ALTER COLUMN status TYPE order_status 
  USING status::order_status;

-- Create loyalty_points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0,
  level TEXT DEFAULT 'новичок',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, weight, category, image_url, cooking_time, rating) VALUES
  ('Шашлык из свинины', 'Нежное свиное мясо, маринованное в секретном соусе по семейному рецепту', 350.00, '100 г', 'Шашлыки', 'https://images.unsplash.com/photo-1612365162249-3a2dd0d1e6e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', '25 мин', 4.8),
  ('Шашлык из говядины', 'Отборная говядина, приготовленная на углях до совершенства', 420.00, '100 г', 'Шашлыки', 'https://images.unsplash.com/photo-1634233961945-7d3ecd94e750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', '30 мин', 4.9),
  ('Люля-кебаб', 'Традиционные люля-кебаб из баранины с ароматными специями', 380.00, '150 г', 'Шашлыки', 'https://images.unsplash.com/photo-1618698045872-55731a4d7f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', '20 мин', 4.7),
  ('Салат Овощной', 'Свежие овощи с домашней заправкой', 150.00, '200 г', 'Салаты', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', '5 мин', 4.5),
  ('Картофель по-деревенски', 'Ароматный картофель, запеченный на углях', 120.00, '150 г', 'Гарниры', 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', '25 мин', 4.6),
  ('Комбо-набор', 'Шашлык из свинины, картофель, салат и соус на выбор', 550.00, '500 г', 'Комбо', 'https://images.unsplash.com/photo-1573462910101-15e180c90ba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', '35 мин', 4.9);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for orders table
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for loyalty_points table
CREATE POLICY "Users can view their own loyalty points" ON loyalty_points
  FOR SELECT USING (auth.uid() = user_id);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON TABLE users TO authenticated;
GRANT ALL ON TABLE menu_items TO authenticated;
GRANT ALL ON TABLE orders TO authenticated;
GRANT ALL ON TABLE loyalty_points TO authenticated;
GRANT USAGE ON SEQUENCE menu_items_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE orders_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE loyalty_points_id_seq TO authenticated;