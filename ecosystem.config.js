module.exports = {
  apps: [{
    name: "todo_api",
    script: 'src/app.js',
    instances: 1,
    autorestart: true,
    watch: 'false',
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],
  deploy: {
   production : {
    user: 'root',           //ssh 用户
    host: '123.56.185.180',       //ssh 地址
    ref: 'origin/feature01',       //GIT远程/分支
    repo: 'git@github.com:JackWsjls/todo-api-l-n.git',  //git地址
    path: '/var/www/production',    //服务器文件路径
    "post-deploy": 'npm install && pm2 reload ecosystem.config.js --env production' //部署后的动作
   }
 }
};
