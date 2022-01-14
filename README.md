# api.demo.gtr.com

# Sample request
```
curl --location --request POST 'https://gatir-demo.herokuapp.com/api/records' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}'
```
# Sample response for failed validation
```
{
    "code": 422,
    "msg": "minCount requires a number. e.g. 3000",
    "records": []
}
```
