export const titlesWithRatingHigherThenAvarege = [
    {
      '$facet': {
        'comedies2010': [
          {
            '$match': {
              '$and': [
                {
                  'year': 2010
                }, {
                  'genres': 'Comedy'
                }
              ]
            }
          }, {
            '$project': {
              '_id': 0, 
              'title': 1, 
              'rating': '$imdb.rating'
            }
          }
        ], 
        'avg': [
          {
            '$group': {
              '_id': null, 
              'avg': {
                '$avg': '$imdb.rating'
              }
            }
          }, {
            '$project': {
              '_id': 0
            }
          }
        ]
      }
    }, {
      '$unwind': {
        'path': '$comedies2010'
      }
    }, {
      '$replaceRoot': {
        'newRoot': {
          '$mergeObjects': [
            '$$ROOT', {
              '$arrayElemAt': [
                '$avg', 0
              ]
            }
          ]
        }
      }
    }, {
      '$match': {
        '$expr': {
          '$gt': [
            '$comedies2010.rating', '$avg'
          ]
        }
      }
    }, {
      '$project': {
        'title': '$comedies2010.title'
      }
    }
  ];
  export const commentWithMovieTitle = [
    {
      '$limit': 5
    }, {
      '$lookup': {
        'from': 'movies', 
        'localField': 'movie_id', 
        'pipeline': [
          {
            '$project': {
              '_id': 0, 
              'title': 1
            }
          }
        ], 
        'foreignField': '_id', 
        'as': 'movieid'
      }
    }, {
      '$replaceRoot': {
        'newRoot': {
          '$mergeObjects': [
            {
              '$arrayElemAt': [
                '$movieid', 0
              ]
            }, '$$ROOT'
          ]
        }
      }
    }, {
      '$project': {
        'movieid': 0, 
        'movie_id': 0
      }
    }
  ];