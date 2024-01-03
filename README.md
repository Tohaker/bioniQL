# bioniQL

![BioniQL Logo](./docs/logo.png)

[![Test](https://github.com/Tohaker/bioniQL/actions/workflows/test.yml/badge.svg)](https://github.com/Tohaker/bioniQL/actions/workflows/test.yml)

> Pronounced the same as "Bionicle"

This repo contains a GraphQL server that aims to demonstrate all the features of the [GraphQL spec](https://spec.graphql.org/). To keep things fresh and fun, it serves data on the [Bionicle](https://en.wikipedia.org/wiki/Bionicle) line of LEGO sets, released from 2001 to 2023 (with some breaks in between)

## Running

The server consists of a Node.JS server and a JSON server to serve the database. For correct operation, these must be run together.

To run the server;

```sh
$ npm run build
$ npm start
```

To run the database

```sh
$ npm run start:db
```

You can then access the GraphiQL interface on `http://localhost:4000/graphql` in your browser.

## Development

You can easily run both the server and the database together in watch mode for fast development;

```sh
$ npm run dev
```

Updating the database file or the source code will cause the respective process to restart.

### Testing

End to end tests are provided to demonstrate features of the server. If you want examples on which requests you can send to the server, this should be your first port of call.

You can run the tests with;

```sh
$ npm t
```
