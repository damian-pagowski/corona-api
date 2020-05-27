# Corona API

Simple REST service providing COVID 19 statistics.

## Installation

```bash
npm install
```

## Usage

```python
npm start

```

OR

```python
npm run dev

```

## API
### GET /list/countries
Retrieve names of all reported countries 

### GET /countries/:<country_name>

Retrieve 'corona' stats for given country

- path param: country name short ( alias - recommended lowercase, without spaces)
- query params:
  -- date (optional) formatted as YYYY-MM-DD,
  -- latest_only - to retrieve single record only (latest)

### POST /countries

Create a report for single country

- example:

```
{
  "short": "poland",
  "name": "Poland",
  "totalCases": 22074,
  "newCases": 500,
  "totalDeaths": 1024,
  "newDeaths": 100,
  "totalRecovered": 10020,
}
```

## TODO

- authentication (JWT)
- error handling
- more detailed data models?
- ??
