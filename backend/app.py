import os

from flasgger import Swagger
from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['test-database']
collection = db['test-collection']

class HelloWorld(Resource):
    def get(self):
        """
                Example reqource
                ---
                responses:
                  200:
                    description: Hello World
                    schema:
                      properties:
                        hello:
                          type: string
                          description: Simple value
                          default: World
                """
        return {'hello': 'world'}


api.add_resource(HelloWorld, '/')


class InsertMongo(Resource):
    def get(self):
        """
        Inserts a simple object into mongodb
        """

        post_data = {
            'name': 'John Doe',
            'email': 'example@example.com'
        }

        collection.insert_one(post_data)

        return {'status': 'success'}


api.add_resource(InsertMongo, '/insert')


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
