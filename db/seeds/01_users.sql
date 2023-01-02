-- Users table seeds here (Example)
INSERT INTO users (name,email,password) VALUES ('Alice' , 'alice@gmail.com', 123);
INSERT INTO users (name,email,password) VALUES ('James' , 'james@gmail.com', 456);
INSERT INTO users (name,email,password) VALUES ('Larry' , 'larry@gmail.com', 789);

INSERT INTO maps (user_id,name,country,city, latitude ,longtitude ) VALUES (1, 'tmap','Canada' , 'Toronto', 5, 10, );
INSERT INTO maps (country,city, latitude ,longtitude ) VALUES (2, 'fmap','America' , 'Fairyland', 6, 8, );
INSERT INTO maps (country,city, latitude ,longtitude ) VALUES (3, 'mmap','Madeupland' , 'Madeupcity', 4, 5, );