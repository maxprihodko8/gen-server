### Gen server, Node.JS + Express
Which it does? So, it finds all the gens from the `gen.txt` file. 
Then saves it to the Redis, and adds the API on /genes/find/:gen to detect if the gen is in file.

Caveats: 
- uses Redis
- may not find the required gen if the file is large, and the API is still loading file
- to defy if the data is loaded you can use the /genes/loading-check
- Redis is not clean after all