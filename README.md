## Description

Insoftex coding task.

## Installation

```bash
$ cp .env.example .env
$ docker-compose up -d --build
```

## Running DB migrations

```bash
$ docker exec insoftex-app npm run migration:run:dev
```

## Seed vaccines

```bash
$ docker exec insoftex-app npm run worker:seed-vaccines:dev
```

## Use the app

### Fetch response:

```bash
$ curl --request GET '127.0.0.1:3000/vaccine-summary?c=AT&dateFrom=2020-W53&dateTo=2021-W52&rangeSize=5&sort[0][field]=NumberDosesReceived&sort[0][direction]=descending&sort[1][field]=weekStart&sort[1][direction]=ascending'
```

#### Response:
```
{
    "summary": [
        {
            "weekStart": "2021-W45",
            "weekEnd": "2021-W50",
            "NumberDosesReceived": 5741750
        },
        {
            "weekStart": "2021-W25",
            "weekEnd": "2021-W30",
            "NumberDosesReceived": 3292160
        },
        ...
        {
            "weekStart": "2021-W05",
            "weekEnd": "2021-W10",
            "NumberDosesReceived": 678810
        },
        {
            "weekStart": "2020-W53",
            "weekEnd": "2021-W05",
            "NumberDosesReceived": 304965
        }
    ]
}
```

## Test

```bash
$ npm run test

# test coverage
$ npm run test:cov
```
