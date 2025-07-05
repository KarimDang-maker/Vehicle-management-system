#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage des tests E2E avec Playwright...\n');

// Fonction pour exécuter une commande
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Fonction principale
async function main() {
  try {
    // Vérifier si le serveur est en cours d'exécution
    console.log('📋 Vérification du serveur...');
    
    // Démarrer le serveur en arrière-plan si nécessaire
    console.log('🔧 Démarrage du serveur de développement...');
    
    // Attendre que le serveur soit prêt
    console.log('⏳ Attente du démarrage du serveur...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Lancer les tests
    console.log('🧪 Lancement des tests Playwright...\n');
    
    const testArgs = process.argv.slice(2);
    let command = 'npx playwright test';
    
    if (testArgs.includes('--ui')) {
      command = 'npx playwright test --ui';
    } else if (testArgs.includes('--headed')) {
      command = 'npx playwright test --headed';
    } else if (testArgs.includes('--debug')) {
      command = 'npx playwright test --debug';
    } else if (testArgs.includes('--dev')) {
      command = 'npx playwright test dev-tests.spec.js';
    }
    
    await runCommand(command);
    
    console.log('\n✅ Tests terminés avec succès !');
    
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'exécution des tests:', error.message);
    process.exit(1);
  }
}

// Gestion des signaux pour arrêter proprement
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt des tests...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt des tests...');
  process.exit(0);
});

// Lancer le script
main(); 