#!/usr/bin/env node
import { execSync } from 'child_process';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const projectRoot = resolve(process.cwd());

function cleanupProject() {
  console.log('🧹 Starting project cleanup...');

  // Clean pnpm store
  try {
    console.log('\n📦 Cleaning pnpm store...');
    execSync('pnpm store prune', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error cleaning pnpm store:', error.message);
  }

  // Remove unused dependencies
  try {
    console.log('\n🔍 Checking for unused dependencies...');
    execSync('pnpm dlx depcheck', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error checking dependencies:', error.message);
  }

  // Clean TypeScript build cache
  try {
    console.log('\n🗑️  Cleaning TypeScript build cache...');
    execSync('rm -rf .next', { stdio: 'inherit' });
    execSync('rm -rf tsconfig.tsbuildinfo', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error cleaning TypeScript cache:', error.message);
  }

  // Remove node_modules and reinstall
  try {
    console.log('\n♻️  Reinstalling dependencies...');
    execSync('rm -rf node_modules', { stdio: 'inherit' });
    execSync('pnpm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error reinstalling dependencies:', error.message);
  }

  // Run TypeScript compiler to check for unused files
  try {
    console.log('\n📝 Running TypeScript compiler check...');
    execSync('pnpm tsc --noEmit', { stdio: 'inherit' });
  } catch (error) {
    console.error('TypeScript found some issues:', error.message);
  }

  console.log('\n✨ Cleanup complete!');
}

cleanupProject();
