Following command must be run in CMD before testing on Windows:
set GOOGLE_APPLICATION_CREDENTIALS=credentials.json

Endpoints:

GET /get-items/:bucketName
Returns:
200: {"items": arr}
400: {"error":err.message, "message":"Failed to get bucket items"}

GET /download-item/:bucketName/:fileName
Returns:
200: {"message": "Download complete"}
400: {"error":err.message, "message": "Download failed"}


POST /add-item/:docID with JSON object as body
Returns:
200: {"message": message}
400: {"error":err.message, "message": "Failed to add item"}

GET /get-item/:docID
Returns:
200: {"data": doc.data()}
400: {"message": "No such document"} OR {"error":err.message, "message": "Failed to add item"}


GET /extract-name/:bucketName/:fileName
Returns:
200: {"name": text.toUpperCase()}
400: {"error": results[0].error.message} OR {"error": "No text found"} OR {"error":err.message, "message":"Failed to extract text"}

GET /extract-Text/:bucketName/:fileName
Returns:
200: {"text": text.split("\n")}
400: {"error": results[0].error.message} OR {"error": "No text found"} OR {"error":err.message, "message":"Failed to extract text"}

GET /extract-Ingredients/:bucketName/:fileName
Returns:
200: {"text": text.split(",")}
400: {"error": results[0].error.message} OR {"error": "No text found"} OR {"error":err.message, "message":"Failed to extract text"}
