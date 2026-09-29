# anumat-erp-all

A bundle: it has no skills or commands of its own. Installing it installs every
plugin in the `anumat-erp` marketplace as a dependency.

```
/plugin marketplace add Anumat-ERP/anumat-erp-claude-plugin
/plugin install anumat-erp-all@anumat-erp
```

To remove the bundle and the plugins it pulled in: uninstall `anumat-erp-all`,
then run `claude plugin prune` to remove dependencies nothing else needs.
