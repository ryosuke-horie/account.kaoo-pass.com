# Mem-Vision-Front

## 技術概要
Bun+Vite+Vue3(TypeScript)で構築。
S3+CloudFrontによるSPAを作成する。

## Bun
### 公式
https://bun.sh/docs/

### インストール
```
curl -fsSL https://bun.sh/install | bash
bun upgrade
```

### node_modulesの作成
```
bun install
```

### bun ライブラリ追加
```
bun add -d [package]
```

## 諦めたこと
- husky
  うまく動かない？ドキュメントにも記載がなく、記事も特にヒットしなかった...
