# SHORT ONELINER FOR eslint prettier dependencies

## ⭐ USAGE

```
yarn dlx iusllint
```

```
npx iusllint
```

## 📺 Options

Generate typescript config file

```
iusllint --t
```

Generate typescript config file and install TYPESCRIPT and Dev Node THINGS

```
iusllint --ts
```

Generate typescript config file and install TYPESCRIPT and Dev Node THINGS and configure package.json: main, start script, prebuild and installs utilities.

```
iusllint --tsc
```

## 🌻 IUSLLINT INSTALLS 6 DEV DEPENDENCIES TO YOUR CURRENT NPM PROJECT

```
"devDependencies": {
  "@typescript-eslint/eslint-plugin": "4.28.0",
  "@typescript-eslint/parser": "4.28.0",
  "eslint": "7.29.0",
  "eslint-config-prettier": "8.3.0",
  "eslint-plugin-prettier": "3.4.0",
  "prettier": "2.3.2"
}
```

## 🌻 IUSLLINT INSTALLS 1 DEPENDENCY TO YOUR CURRENT NPM PROJECT (REQUIRED IF TSCONFIG `importHelpers`)

Redusces ts -> js generated code.
- Practice from angular project.

```
  "dependencies": {
    "tslib": "2.3.0"
  }
```

# 🔫USLLINT PROJECT USES 12 DEV PACKAGES AND 1 UTILITY

12 Dev packages could be installed throught iusllint script.

## - TYPESCRIPT and Dev Node THINGS

```
yarn add -D typescript ttypescript ts-node nodemon ts-transformer-keys @types/node -E
```

### If --ts used, you could use the ts dev env like this:

```json
{
  "start": "nodemon --watch \"src/**\" --ext \"ts,json,env\" --ignore \"src/**/*.spec.ts\" --exec \"ts-node src/index.ts\""
}
```

## - ESLINT PRETTIER

```
yarn add -D eslint eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin -E
```

## - Utilities

```
yarn add -D rimraf -E
```

# ✨ IUSLLINT DEPENDENCY: 1 PACKAGE

```
yarn add yargs -E
```

```
yarn add -D @types/yargs -E
```
