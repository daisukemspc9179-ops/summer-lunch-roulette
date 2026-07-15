# 夏休みのお昼ごはんルーレット

Next.jsをCloudflare Workersで動かすための保存済みプロジェクトです。

## 安全に公開する順番

1. Cloudflare Zero Trustで、使用予定の独自ドメインを対象に「Self-hosted」Accessアプリを作ります。
2. Accessの許可ルールに、閲覧を許可するメールアドレスだけを登録します。
3. `wrangler.jsonc` の末尾にある `routes` の例を有効にし、Accessを設定した独自ドメインへ書き換えます。
4. 下記コマンドで確認後、デプロイします。

```bash
npm install
npm run preview
npm run deploy
```

## 重要な安全設定

- `workers_dev: false`：認証のない `workers.dev` 公開を無効化
- `preview_urls: false`：Accessを迂回できるプレビューURLを無効化
- 認証はCloudflare Accessに任せ、アプリ内にはパスワード認証を作りません
- APIキーやトークンを追加する場合は、ソースへ書かずCloudflare Secretsを使います
- GitHubへ保存する場合は必ずPrivateリポジトリにします

このアプリはデータを保存しないため、Cloudflare D1は使用していません。
