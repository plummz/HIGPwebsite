import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: base must match the GitHub repository name for project pages.
// Format: "/<repo-name>/"
// This repo is: https://github.com/plummz/HIGPwebsite
// So the base path is "/HIGPwebsite/"
//
// If this were a user/org pages repo (plummz.github.io), use base: "/"
export default defineConfig({
  plugins: [react()],
  base: '/HIGPwebsite/',
})
