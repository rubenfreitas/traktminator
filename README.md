[![BuildStatus](https://semaphoreci.com/api/v1/projects/88392fa3-c84a-4be9-871d-0a8a526acbe9/512651/badge.svg)](https://semaphoreci.com/rfreitas/traktminator-2)
[![CodeClimate](https://codeclimate.com/github/rubenfreitas/traktminator/badges/gpa.svg)](https://codeclimate.com/github/rubenfreitas/traktminator)
[![TestCoverage](https://codeclimate.com/github/rubenfreitas/traktminator/badges/coverage.svg)](https://codeclimate.com/github/rubenfreitas/traktminator/coverage)

# traktminator

Interact with trakt using your terminal

## Features

* Search for series and movies;

## Installation

```bash
    $ npm install -g . . .
```

## Quick Start

### Authentication

The first thing you should do before starting the application is set the authentication pin. This requires just a couple of simple steps:

Visit https://trakt.tv/pin/5820 (login required), and it will generated an alpha-numeric pin, copy it and run the following comand:

```bash
    $ traktminator set-auth [pin]
```

You should be prompet with a success message, and you're good to go!

There is a command available that it's on job is to test if your current authentication settings are working:

```bash
    $ traktminator test-auth
```


## license

Copyright (c) 2015, Rúben Freitas (MIT License)

See LICENSE for more info.
