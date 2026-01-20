FROM ruby:3-alpine
RUN apk add --update build-base curl
RUN gem install sinatra rackup puma
ADD hasher.rb /
CMD ["ruby", "hasher.rb"]
EXPOSE 80

