# Tonite
Par Ludovic Loridan & Alexis Camus

Tonite affiche les programmes TV français de la nuit d'aujourd'hui. 
Utilise le plus de technos web modernes possibles.

## Tester directement (Solution hébergée)
<http://tonite.alwaysdata.net/>

*Attention :* Sur cette solution, le chat live ne fonctionnera pas. En effet, nous n'avons pas trouvé d'hebergeur gratuit acceptant un serveur webSocket… Vous devrez le tester en local.

## Utilisation
- Cliquez sur un programme.
- Les détails apparaissent.

## Description des dossiers

app/
: L'application se situe ici. Lancez index.html (Depuis un serveur apache)

templates/
: Des templates qui ont servi à créer l'UI de l'application

websocket_server/
: Le serveur websocket pour le chat. Lancez "php server.php"

## Grille d'autoévaluation
<https://docs.google.com/spreadsheet/pub?key=0AtA3JSG0H-nUdE9iZWJsUG9ybVpuMjNMSmlnVU1JdkE&single=true&gid=0&output=html>

## Screenshots
![Ecran principal](https://github.com/ludovic-loridan/Tonite/raw/master/images/1.png)

![Détail du programme](https://github.com/ludovic-loridan/Tonite/raw/master/images/2.png)

![Ecran de détail (Mode mini)](https://github.com/ludovic-loridan/Tonite/raw/master/images/3.png)

![Ecran de chat (Mode mini)](https://github.com/ludovic-loridan/Tonite/raw/master/images/4.png)
