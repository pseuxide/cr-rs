必要なもの
- Github Actions Secrets
  - PROJECT_ID: GCPのプロジェクトID。
  - DB_PASSWORD: databaseのパスワード。
  - WORKLOAD_IDENTITY_PROVIDER: OIDCに使うprovider
  - DATABASE_URL: `postgres://postgres:$PASSWORD@$IP_ADDRESS:5432/$DATABASE_NAME?host=/cloudsql/$DB_CONNECTION_NAME&sslmode=disable`の形
- Github Actions env
  - PROJECT_ID: Secrets内のPROJECT_ID。
  - GAR_REPO_NAME: Artifact Registryのリポジトリ名。
  - IMAGE: Artifact Registryに保存するイメージの名前。
  - REGION: リージョン。asia-northeast1でいい。
  - TAG: latest
  - WORKLOAD_IDENTITY_PROVIDER: サービスアカウントの権限を借用するときに使う。
  - SERVICE_ACCOUNT: Cloud RunやArtifact Registry push時に使うサービスアカウント。アタッチする権限は以下の通り:
    - Artifact Registry 管理者
    - Cloud Run 管理者
    - Cloud SQL クライアント
    - Cloud SQL 管理者
    - サービス アカウント トークン作成者
    - サービス アカウント ユーザー
  - DB_INSTANCE_NAME: Cloud SQLのインスタンス名。
  - DB_PASSWORD: Cloud SQLのパスワード。
  - DATABASE_URL: DBの接続用のURL。


