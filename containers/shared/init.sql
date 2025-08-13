
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    expiry_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS smartphones (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description) VALUES 
('USER', 'Standard user role'),
('ADMIN', 'Administrator role')
ON CONFLICT (name) DO NOTHING;

INSERT INTO users (username, email, password) VALUES 
('testuser', 'test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.'),
('admin', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.')
ON CONFLICT (username) DO NOTHING;

INSERT INTO smartphones (name, brand, price, description, image_url) VALUES 
('iPhone 15', 'Apple', 124800.00, '最新のiPhone', '/images/iphone15.jpg'),
('Galaxy S24', 'Samsung', 119800.00, 'Samsung最新モデル', '/images/galaxy-s24.jpg'),
('Pixel 8', 'Google', 112800.00, 'Google純正スマートフォン', '/images/pixel8.jpg')
ON CONFLICT DO NOTHING;
