# release

## branch:feature01

上到测试环境123.56.185.180服务器
<http://123.56.185.180:2000/list/1/1>

```json
{
  "development": {
    "username": "root",
    "password": "111111",
    "database": "todo_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+08:00"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

## 2022年6月21日

获取访问用户的ip信息，访问次数
`npx sequelize model:generate --name visitor --attributes ip:string,address_detail:string,point:string,count:integer`
`npx sequelize db:migrate`

## 问题

### nodejs+nginx获取真实ip,解决获取ip为127.0.0.1的问题

<https://blog.csdn.net/lhz_19/article/details/120372640>
访问互联网上的服务时，大多数时，客户端并不是直接访问到服务端的，而是客户端首先请求到反向代理，反向代理再转发到服务端实现服务访问，通过反向代理实现路由/负载均衡等策略。这样在服务端拿到的客户端IP将是反向代理IP，而不是真实客户端IP。我的项目服务器是使用nginx做代理，由于nginx反向代理的问题，所以导致获取出来的ip都是::ffff:127.0.0.1

#### 配置Nginx

```bash
location / {
　　proxy_set_header Host $http_host;
　　proxy_set_header X-Real-IP $remote_addr;
　　proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
　　proxy_pass http://127.0.0.1:8360/;
}
```

#### 通过node获取ip

```bash
const ip =  req.headers['x-forwarded-for'] 　||　req.headers['x-real-ip']
```

### node.js使用百度地图api根据ip获取用户ip所在地

<http://blog.lhzzs.top/portal/blogs/essay/61246b36bdade344f8154231>

示例访问
<http://api.map.baidu.com/location/ip?ak=6SzbKrxC5vwupOECpO4AhL8sPDyWf2Xa&ip=222.128.5.203&coor=gcj02>
