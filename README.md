# Development

Launch application in development mode, including automatic refresh :
```sh
npm install
```

```sh
npm start
```

3. Access `http://localhost:8082/`.

# API

There are one endpoint to target
```sh
http://localhost:8082/talks
```
You can filter by company or by tag  :

```sh
http://localhost:8082/talks?company=Sqli
```

```sh
http://localhost:8082/talks?tag=Mobile
```

Generated bundles are stored in the `/dist` directory.
