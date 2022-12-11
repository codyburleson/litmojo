Update the version number in `package.json`, `manifest.json`, and `manifest-beta.json` to conform to the Semantic Versioning standard. (Note for future: manifest-beta.json can diverge from actual released version).

`npm run build`

Commit changes.

Tag the repo to match the version specified in `package.json`.

```
git tag -a 0.0.4 -m "0.0.4"  
git push origin 0.0.4
```

Create release on github, adding manifest, main.js, and optionally css



