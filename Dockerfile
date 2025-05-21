# syntax=docker/dockerfile:1
FROM node:20 AS frontend

WORKDIR /app
COPY . .
RUN corepack enable && pnpm install && pnpm run build

FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev

# Install PHP extensions
RUN docker-php-ext-install pdo mbstring exif pcntl bcmath gd pdo_sqlite

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy backend code, but exclude public/build to avoid overwriting
COPY . /var/www/html
RUN rm -rf /var/www/html/public/build

# Copy built frontend from previous stage (including /build)
COPY --from=frontend /app/public/build /var/www/html/public/build

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Ensure storage and bootstrap/cache directories exist before setting permissions
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
