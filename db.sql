CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    text TEXT,
    date TIMESTAMP,
    country_id INT,
    language_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);