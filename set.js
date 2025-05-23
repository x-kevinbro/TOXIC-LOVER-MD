


const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEI3S0h3TzRJK2JvMG5odWFxLzhNY1NZbGhGN1J1VVVLS3dubUVDUkgwVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzAvRFR4L1Nld3BuM1d2aTlrZnViSkkwNkI4N0Q5N1hYbUZ6RnFZc3JRbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QStwZTZYdWhWcko5TUlmdFZ0aTYzbEdZbzFZZGtOQVlCUk9tRnBVQzNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwaGVJMzRHNXpMYUxrSlpZZUdLbkpWL1RZd1YwZkRoRXFYUXdXMHRMM25BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFNUmxHQ0p1ME90TFlxSElGWFEvUUNKNmVMUHNGOERZb2x4cFlMS25SVUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVVNFNycWZBYkxNNjZ2Zk9aT1N0RE5Ma1NaTTRXRUlKZ1FTUlRMVUFXRVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUxITnJaTzduemhrTGFYWGNsR213RWROWENnZ2Y4Y3hNRDZ6emV6Tk1Gbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzFiUkJTSFJCOGxxRzhOc3F2VjQ1WGtUZUd0SkFWYzgxVzNhWlVRUTVEND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJLemw0UDlNU1BUK3RqeFVHeU92VXBnTnAxYVgwZmp2NnNtYldBNVI3cG5RT3JodkV3dFlEbGNWcGFoUUhOWlJNQVZLMG1qZ29Zbk9OQ0ZRbDhkc2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzgsImFkdlNlY3JldEtleSI6IjNTOUNaRUdYNXhOejFnYk94RUZadVUzaTB2Y0pZOStSYjNNMUhsdzdROXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NTY1MzkyNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzkwN0QzMTVDQzI3ODFFOTdCQjUzQjY2RTU3ODA0MUYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NDgyMzcxM30seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NTY1MzkyNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMkU0OTc0QjUxNjA5MjQwQTlEM0JFNDY4MzE3Mzk2NjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NDgyMzcxNH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NTY1MzkyNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzM2RUE1NkE1NTMxMjRBN0VDQjYxQzRFQUYwRkYyRjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NDgyMzcyMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoidTJPQmVkQmtTRkczZ2hqUTFZbmxZdyIsInBob25lSWQiOiJmY2NmYWVhYS1kZTk5LTQ0MDItOTliOC03Y2Q0ZDc2ZmU5NjQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGN4bTNwdVpHd0tIOThSWTJhMkNEZlpJWjJnPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktoU0VRYXh4enFqaEh5STRRTGRkT0lMc1VhWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJWUEQ5RkdNWSIsIm1lIjp7ImlkIjoiOTQ3NTY1MzkyNTI6MzhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2ZrS3wnZee8J2XsvCdmIPwnZe28J2XuyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTCtGcHZJSEVJL0wvNzhHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWFlLbkxHTTlaS3dJWDU4akVSU0dLWUQyMzg4Ui8vcVc4Z1RyL1loMVBqMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZ0J5VzBnSCtEWkhCeUFRSkRlcUh6K3lxWUordjJrUVBUd1Fpc29rc0cwbVp0Yk1Fb2VaOThVYXd1TXkzVXUwS0lTV2RYcmxvaGYvOWhZOC9ETUNGQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IldhRnJFZ3Q1ejlvUDBrSk9jWTJJN0lWTlRqVlhRUno0U3FHd3JGQ3draGdZa0VhVENuZ3FRQlE5WHZBL0txS1lWdzMvNkF3dWUzbE9wa3d3UnhNaGdnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NTY1MzkyNTI6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVjJDcHl4alBXU3NDRitmSXhFVWhpbUE5dC9QRWYvNmx2SUU2LzJJZFQ0OSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDgyMzcwOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMUjUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "x-Kevin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "x-Kevin",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    CHATBOT1 : process.env.AUDIO_CHATBOT || "no",
    CHATBOT2 : process.env.CHATBOT2 || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://neondb_owner:npg_0lnOAfeITC1k@ep-fancy-wave-a547g5ay-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
