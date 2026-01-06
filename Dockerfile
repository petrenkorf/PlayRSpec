FROM ruby:3.4.8-slim-bookworm

RUN apt update && apt install -y \
  build-essential \
  unzip \
  curl

WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle install

RUN bundle exec rbwasm build -o base.wasm
