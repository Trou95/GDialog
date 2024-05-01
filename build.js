const esbuild = require('esbuild');

// Build your application with esbuild
esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'browser',
    target: 'es2015',
    outfile: 'dist/index.js',
}).catch(() => process.exit(1))