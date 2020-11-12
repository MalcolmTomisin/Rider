// import {io} from 'socket.io-client';
// let socket;
// email validation utils
export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// formart currency
export const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = '.',
  thousands = ',',
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
};

// export const initializeSocket = () => {
//   socket = io('https://dev.api.logistics.churchesapp.com', {
//     reconnectionDelayMax: 10000,
//   });
//   if (socket) {
//     socket.on('connect', () => {
//       console.log('connected');
//     });
//   }
// };

// export const disconnectSocket = () => {
//   console.log('Disconnecting socket...');
//   if (socket) {
//     socket.disconnect();
//   }
// };

// export const subscribeToEvent = (cb) => {
//   if (!socket) {
//     return true;
//   }
//   socket.on('NEW_ENTRY', (msg) => {
//     console.log('Websocket event received!');
//     return cb(null,msg);
//   });
// };
