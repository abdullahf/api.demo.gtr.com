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
# Sample reponse
```
{
    "code": 0,
    "msg": "success",
    "records": [
        {
            "key": "ibfRLaFT",
            "createdAt": "2016-12-25T16:43:27.909Z",
            "totalCount": 2892
        },
        {
            "key": "pxClAvll",
            "createdAt": "2016-12-19T10:00:40.050Z",
            "totalCount": 2772
        },
        ... 
}
```
# Sample response for failed validation
```
{
    "code": 422,
    "msg": "minCount requires a number. e.g. 3000",
    "records": []
}
```
