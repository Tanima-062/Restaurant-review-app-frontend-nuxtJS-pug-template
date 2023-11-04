# holiday

> Adventure-inc holiday project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# ⬇︎ この辺ちゃんとまとめてscriptに入れます！CIとか時間あればやりますので！
# linter
$ yarn lint

# lint + prettier
$ yarn lint --fix
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## ディレクトリ構成（main）

tour

- server
  - index.ts
- src
  - assets
  - components
    - atoms
    - molecules
    - organisms
    - pages
  - layouts
  - middleware
  - pages
  - plugins
  - static
  - store
    - repository
  - @types
    - \*.d.ts
  - utils
  - helper
- test
  - \*_/_.spec.ts
- story_book

## tsconfig.json

まだ少し足りなそうな予感  
typeRoots 辺りの知見が弱い  
nuxt v3.0.\* で変わる可能性大なので後回し  
コメントできないのがめんどいので JS にしたい

## package.json

余計なモジュールを使ってそう  
devDependencies の方なのでとりあえず OK

## server/index.ts

型定義してないけど開発のみだからひとまず OK  
仮に API 定義したとしても開発のみにする  
dotenv 追加する

## eslint.js

lint は JS に乗せた  
ルールは書きながら設定する  
package の script はこれから入れる（朴さんと相談）

## nuxt.config

基本的な設定は入れたので、あとは追い追い追加していく  
module,plugins 辺りの設定等、実装ベースで考える

## jest.config

spec 用。こっちも ts にしないといけないけど後回し  
lint で拾ったら無視で OK

## gitignore

ちゃんと設定しないと。server も不要だし

## editorconfig, vscode.config

lint と prettier 効くようにしないと・・・。やる

## story story_book

まだ入れていない。結構大変になっちゃうので余裕があればやる

## vscode

vetur が modules を読み込めない問題  
バグっぽいので調査し。vscode 入れ直し?
