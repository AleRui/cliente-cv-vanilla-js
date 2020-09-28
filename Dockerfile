FROM php:7.2.7-apache

LABEL maintainer="administrator@gmail.com"

USER root

RUN apt-get update && apt-get install -y --fix-missing \
  apt-utils \
  bash-completion \
  cron \
  curl \
  git \
  gnupg \
  graphviz \
  imagemagick \
  mysql-client \
  mariadb-client \
  libedit-dev \
  libedit2 \
  libfreetype6-dev \
  libicu-dev \
  libjpeg62-turbo-dev \
  libmcrypt-dev \
  libonig-dev \
  libpng-dev \
  libpq-dev \
  libssl-dev \
  libxml2-dev \
  libxslt1-dev \
  libyaml-dev \
  libzip-dev \
  linux-libc-dev \
  locate \
  lynx \
  psmisc \
  systemd \
  tar \
  unzip \
  wget && \
  apt-get clean &&  \
  rm -r /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-jpeg-dir=/usr/include/

RUN docker-php-ext-install \
  bcmath \
  calendar \
  exif \
  ftp \
  gd \
  intl \
  mbstring \
  mysqli \
  opcache \
  pdo_mysql \
  soap \
  xsl \
  zip

RUN a2enmod rewrite
RUN a2enmod headers

# XDebug and Composer
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
RUN touch /var/log/xdebug_remote.log
RUN chmod 777 /var/log/xdebug_remote.log

RUN ln -sf /dev/stdout /var/log/apache2/access.log \
  && ln -sf /dev/stderr /var/log/apache2/error.log

RUN curl -sS https://getcomposer.org/installer | php \
  && mv composer.phar /usr/local/bin/composer \
  && ln -s /usr/local/bin/composer /usr/bin/composer

# Allow Composer to be run as root and set $PATH for Composer Executables
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV PATH "$PATH:/root/.composer/vendor/bin"

# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

RUN chown -R www-data:www-data /var/www/html

RUN usermod -u 1000 www-data
RUN groupmod -g 1000 www-data

# Expose apache.
EXPOSE 80

CMD /usr/sbin/apache2ctl -D FOREGROUND
