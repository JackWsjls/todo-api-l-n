// // 获取用户IP
// const getIPAdress = () => {
//   const os = require('os')
//   const interfaces = os.networkInterfaces();
//   for(const devName in interfaces) {
//     const iface = interfaces[devName];
//     for(let i=0;i<iface.length;i++){
//     const alias = iface[i];
//       if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
//         return alias.address;
//       }
//     }
//   }
// }
// //通过req的hearers来获取客户端ip
// const getIp = (req) => {
//   var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
//   if(ip.split(',').length>0){
//     ip = ip.split(',')[0];
//   }
//   return ip;
// };
// 获取用户IP
const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
};

module.exports = {
  getClientIp
}