FROM php:8-apache

ARG DEBIAN_FRONTEND=noninteractive

ARG DATABASE_URL

ENV DATABASE_URL $DATABASE_URL

RUN apt-get update && apt-get install mc wget -y
# install symfony-cli
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash -E

RUN apt install symfony-cli -y

COPY php.ini "${PHP_INI_DIR}/php.ini"
# install pdo_pgsql
RUN apt-get install libpq-dev -y

RUN docker-php-ext-install -j$(nproc) pdo_pgsql

RUN docker-php-ext-enable pdo_pgsql
# install composer
RUN EXPECTED_CHECKSUM="$(wget -q -O - https://composer.github.io/installer.sig)" && \
	php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
	ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")" && \
	if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]; then >&2 echo 'ERROR: Invalid installer checksum' && exit 1; fi

RUN php composer-setup.php --quiet && rm composer-setup.php && \
	mv composer.phar /usr/local/sbin/composer && \
	chmod +x /usr/local/sbin/composer

COPY app.conf /etc/apache2/sites-enabled

COPY apache2.conf /etc/apache2

RUN a2enmod rewrite
# Clean up
RUN apt-get autoremove -y && apt-get autoclean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#COPY app/.env.dev /var/www/app/.env

COPY app /var/www/app

WORKDIR /var/www/app

#RUN cp -n -p .env.dev .env

RUN composer install --dev

RUN bin/console lexik:jwt:generate-keypair
