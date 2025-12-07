## 📝 Checklist para fusionar listado-productos en main
1. Guardar y subir tus cambios en la rama actual

```
    git add .
    git commit -m "Finalizando listado de productos"
    git push
```

2. Cambiar a la rama main
```
    git checkout main
```

3. Actualizar main con lo último de GitHub
```
    git pull origin main
```

4. Fusionar la rama listado-productos en main
```
    git merge listado-productos
```

5. Resolver conflictos (si aparecen)

* Abre los archivos marcados con conflictos.

* Corrige el código.

* Haz un commit de la resolución:

```
    git add .
    git commit -m "Resolviendo conflictos al fusionar listado-productos"
```

6. Subir la rama main actualizada a GitHub
```
    git push origin main
```

7. (Opcional) Eliminar la rama si ya no la necesitas
```
    git branch -d listado-productos        # elimina local
    git push origin --delete listado-productos   # elimina en GitHub
```