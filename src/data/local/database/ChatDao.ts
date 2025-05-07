import { MessageEntity } from '@domain/entity/MessageEntity';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'chatnotes.db' });

export const ChatDao = {
  createTable: async () => {
    (await db).transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fromUser TEXT,
          toUser TEXT,
          text TEXT,
          timestamp INTEGER
        )`
      );
    });
  },

  saveMessage: async (msg: MessageEntity) => {
    (await db).transaction(tx => {
      tx.executeSql(
        'INSERT INTO messages (fromUser, toUser, text, timestamp) VALUES (?, ?, ?, ?)',
        [msg.from, msg.to ?? '', msg.text, msg.timestamp]
      );
    });
  },

  getMessagesForUser: async (userId: string): Promise<MessageEntity[]> => {
    return new Promise(async (resolve, reject) => {
      (await (db)).transaction(tx => {
        tx.executeSql(
          'SELECT * FROM messages WHERE fromUser = ? OR toUser = ? ORDER BY timestamp ASC',
          [userId, userId],
          (_, result) => {
            const rows = result.rows.raw();
            const messages: MessageEntity[] = rows.map(row => ({
              from: row.fromUser,
              to: row.toUser,
              text: row.text,
              timestamp: row.timestamp,
            }));
            resolve(messages);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  },

  // 🔹 Ambil chat hanya antara dua user (2 arah)
  getMessagesWithUser: async (userId: string, peerId: string): Promise<MessageEntity[]> => {
    return new Promise(async (resolve, reject) => {
      (await (db)).transaction(tx => {
        tx.executeSql(
          `SELECT * FROM messages 
           WHERE (fromUser = ? AND toUser = ?) 
              OR (fromUser = ? AND toUser = ?) 
           ORDER BY timestamp ASC`,
          [userId, peerId, peerId, userId],
          (_, result) => {
            const rows = result.rows.raw();
            const messages: MessageEntity[] = rows.map(row => ({
              from: row.fromUser,
              to: row.toUser,
              text: row.text,
              timestamp: row.timestamp,
            }));
            resolve(messages);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  },
};
