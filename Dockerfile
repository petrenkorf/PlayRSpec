FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV RUBY_VERSION=3.3.0

# System deps
RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  git \
  unzip \
  ca-certificates \
  libssl-dev \
  libreadline-dev \
  zlib1g-dev \
  libyaml-dev \
  libffi-dev \
  libgdbm-dev \
  libncurses5-dev \
  libdb-dev \
  pkg-config \
  xz-utils \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# Install ruby-build (asdf backend)
RUN git clone https://github.com/rbenv/ruby-build.git /tmp/ruby-build && \
    /tmp/ruby-build/install.sh && \
    rm -rf /tmp/ruby-build

# Build Ruby FROM SOURCE (this is the key)
RUN ruby-build ${RUBY_VERSION} /opt/ruby

ENV PATH="/opt/ruby/bin:/root/.cargo/bin:${PATH}"

# Install Rust (required for ruby_wasm)
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

WORKDIR /app
COPY Gemfile Gemfile.lock ./

# This WILL compile `js` successfully
RUN gem install bundler && bundle install

# Now build wasm (js already built as host extension)
RUN bundle exec rbwasm build -o base.wasm
