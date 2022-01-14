// Construct pipeline expression from request parameters.
// Warning: Don't format the code. It will break the expression by removing single quote.
exports.query = (startDate, endDate, minCount, maxCount) => {
  return [
    {
      '$project': {
        '_id': 0, 
        'key': 1, 
        'createdAt': 1, 
        'totalCount': {
          '$sum': '$counts'
        }
      }
    }, {
      '$match': {
        'createdAt': {
          '$gte': new Date(`${startDate}`), 
          '$lte': new Date(`${endDate}`)
        }, 
        'totalCount': {
          '$gte': minCount, 
          '$lte': maxCount
        }
      }
    }
  ];
} 