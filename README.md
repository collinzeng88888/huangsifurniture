# Huangsi Furniture Website

This repository is prepared for deploying the Huangsi Furniture website with GitHub and Vercel.

## Production domain

- Primary domain: `huangsifurniture.com`
- Recommended redirect: `www.huangsifurniture.com` → `huangsifurniture.com`

## Vercel deployment checklist

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import the GitHub repository.
3. Use the default static-site settings for the current placeholder site:
   - Framework Preset: **Other**
   - Build Command: leave empty
   - Output Directory: `.`
4. Add both domains in **Project Settings → Domains**:
   - `huangsifurniture.com`
   - `www.huangsifurniture.com`
5. Configure DNS at the domain registrar:
   - Apex/root `huangsifurniture.com`: `A` record to `76.76.21.21`
   - `www.huangsifurniture.com`: `CNAME` record to `cname.vercel-dns.com`
6. Wait for Vercel domain verification and SSL certificate provisioning to complete.

## Replacing the placeholder

The current `index.html` is a deployment placeholder. Replace it with the final website package, then commit and push to trigger a new Vercel deployment.
