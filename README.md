# Xiang Li — Research Portfolio

基于 React、TypeScript 和 Vite 的个人研究主页，已配置 GitHub Pages 自动部署。

## 本地运行

```bash
npm ci
npm run dev
```

生产构建：

```bash
npm run build
```

构建结果位于 `dist/`。

## 发布到 GitHub Pages

### 1. 创建并上传仓库

在 GitHub 新建仓库，将本项目的**全部文件**推送到 `main` 分支，包括隐藏目录中的 `.github/workflows/deploy.yml`。

如果希望网址为 `https://<用户名>.github.io/`，仓库名应设为 `<用户名>.github.io`。使用其他仓库名也可以，网址将是 `https://<用户名>.github.io/<仓库名>/`，本项目已兼容这种子目录路径。

### 2. 启用 GitHub Pages

打开仓库的 **Settings → Pages**，在 **Build and deployment → Source** 中选择 **GitHub Actions**。

### 3. 自动构建与发布

向 `main` 分支推送代码后，**Deploy to GitHub Pages** 工作流会自动运行。也可以在仓库的 **Actions** 页面选择该工作流，点击 **Run workflow** 手动发布。

工作流成功后，网站地址会显示在 Actions 运行结果和 **Settings → Pages** 页面中。以后每次推送到 `main`，公开网站都会自动更新。

## 绑定独立域名（可选）

如果已购买独立域名，可在 **Settings → Pages → Custom domain** 中填写域名，并按 GitHub 提示配置域名 DNS 记录。保存后建议启用 **Enforce HTTPS**。
