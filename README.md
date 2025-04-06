# docusaurus-plugin-doxygen

A Docusaurus plugin to integrate the Doxygen reference pages into Docusaurus documentation sites.

The reference pages will be generated under `/docs/api/`, similarly to the pages generated by `docusaurus-plugin-typedoc`

> [!NOTE]
> Work in progress!

---

To install in the project website folder:

```sh
npm install @xpack/docusaurus-plugin-doxygen --save-dev -C website
``

or, during development:

```sh
(cd website; npm link @xpack/docusaurus-plugin-doxygen)
```

Add the plugin to docusaurus.config.js

```
module.exports = {
  // Add option types
  plugins: [
    [
      '@xpack/docusaurus-plugin-doxygen',

      // Options
      {
        doxygenXmlInputFolderPath: 'doxygen/xml',
        outputFolderPath: 'docs/api',
        sidebarFileName: 'sidebar-doxygen.json'
      },
    ],
  ],
};
```


