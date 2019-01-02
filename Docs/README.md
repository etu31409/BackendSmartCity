# Comment lancer notre application web Angular version 6 une fois que vous avez cloné le projet sur votre machine ?

Avant toute chose, vous devez vous assurer d'avoir NodeJs installé sur votre machine, pour cela, tapez la commande 
*node --version* dans une invite de commande. Si NodeJs n'est pas installé, vous pouvez l'installer via ce lien [adresse](https://nodejs.org/en/)

Nous vous conseillons d'utiliser l'environement Visual Studio Code.

Une fois le projet cloné sur votre machine, votre IDE soulignera les imports de modules (@angular/core), c'est normal, 
ils ne sont pas encore installés sur votre machine.

Pour ce faire, vous avez besoin d'installer l'interface de ligne de commande de Angular (Angular CLI).
Tapez dans l'invite de commande *npm install -g @angular/cli*.
Cet outil génère les modules dont nous avons besoin pour faire fonctionner l'application.


Finalement, une fois que vous vous ètes positionné dans le bon répertoire (vous pouvez utiliser la commande *cd .\Sources\ *), vous pouvez lancer l'application via *ng serve*.