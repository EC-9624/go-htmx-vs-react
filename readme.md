## requirements

- Go version go1.23.2 以上
GO ホットリロードモジュールの構築には air を使用します。air をインストールする必要があります
https://github.com/air-verse/air <br/>
https://zenn.dev/urakawa_jinsei/articles/a5a222f67a4fac

- NodeJS v22.13.0

### GO-HTMX アプリの起動方法

```
cd ./go-htmx-example && go mod tidy && air
```
### air 使用しない場合
```
cd ./go-htmx-example && go mod tidy && air && go run ./cmd/main.go 
```

### React アプリの起動方法

```
cd ./react-example && npm install && npm run dev
```
