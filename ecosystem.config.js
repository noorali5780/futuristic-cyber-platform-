module.exports = {
  apps: [{
    name: "cyber-security",
    script: "npm",
    args: "start",
    cwd: "/home/manilla/Futuristic/cyber-security-platform",
    env: {
      PORT: 3001,
      NODE_ENV: "production"
    },
    error_file: "/home/manilla/.pm2/logs/cyber-security-error.log",
    out_file: "/home/manilla/.pm2/logs/cyber-security-out.log",
    time: true,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G"
  }]
}
