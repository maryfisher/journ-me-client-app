| Branch        | Build Status  |
| ------------- | ------------- |
| *develop*     | ![Build Status](https://img.shields.io/shippable/563a7c681895ca4474229808/develop.svg) |
| *production*  | ![Build Status](https://img.shields.io/shippable/563a7c681895ca4474229808/production.svg) |

# How to run the client app #

1. Install NodeJS on your computer
2. Install NPM package "grunt-cli" as a global module
3. Inside project folder, run "npm install" to install local npm dependencies
4. Inside project folder, run "grunt bowerInstall" to install bower components
5. Inside project folder, run "grunt tsd" to install TypeScript definitions
6. Inside project folder, compile/copy app by running "grunt" (default task)
7. Run 5. from journ-me-web-service README
8. The app is deployed at "localhost:8080/index.html"