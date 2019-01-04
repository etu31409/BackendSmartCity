# Application cliente NConnect
Cette application cliente permet de se connecter à son compte NConnect et de gérer les commerces liés à l'utilisateur (ajout/modificaiton/suppresion).

## Prérequis

* Avant toute chose, vous devez vous assurer d'avoir NodeJs installé sur votre machine, pour cela, tapez la commande 
*node --version* dans une invite de commande. Si NodeJs n'est pas installé, vous pouvez l'installer via ce [lien](https://nodejs.org/en/). une fois installé, fermer votre invite de commande, puis ouvrez le à nouveau et retapez la commande.

* Nous vous conseillons d'utiliser l'environement Visual Studio Code [installation](https://code.visualstudio.com/).

* Git pour cloner le projet. Pour le télécharger, rendez-vous à cette [adresse](https://git-scm.com/downloads).

## Clone

* Positionnez-vous dans le répertoire où vous souhaitez cloner le projet, ensuite dans le terminal, tapez *git clone lien gitHub* 

## Installation

* Une fois le projet cloné sur votre machine, votre IDE soulignera les imports de modules (@angular/core), c'est normal, 
ils ne sont pas encore installés sur votre machine.

Pour ce faire, positionnez-vous dans le dossier *Sources* (vous pouvez utiliser la commande *cd .\Sources\ *), puis tapez dans l'invite de commande *npm install*.
Cet outil génère les modules dont nous avons besoin pour faire fonctionner l'application.


Finalement, une fois que vous vous ètes positionné dans le bon répertoire , vous pouvez lancer l'application via *ng serve*.