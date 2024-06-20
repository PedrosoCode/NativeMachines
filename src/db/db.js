import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "db.db"; // Nome do banco de dados
const database_version = "1.0"; // Versão do banco de dados
const database_displayname = "SQLite Database"; // Nome a ser exibido
const database_size = 200000; // Tamanho máximo do banco de dados

let db = null;

export const setupDatabase = async () => {
  try {
    db = await SQLite.openDatabase(
      {
        name: database_name,
        location: 'default', // or 'Library' for iOS
      },
      () => {
        console.log("Banco de dados aberto com sucesso");
      },
      error => {
        console.error("Erro ao abrir banco de dados", error);
      }
    );

    if (db) {
      console.log("Banco de dados está disponível");

      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS tb_ping_pong (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ping TEXT,
          pong TEXT
        );`
      );

      console.log("Tabela tb_ping_pong criada ou já existe");
    } else {
      console.error("Banco de dados não foi inicializado corretamente");
    }
  } catch (error) {
    console.error("Erro ao abrir ou criar banco de dados", error);
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error("Database is not initialized. Call setupDatabase first.");
  }
  return db;
};
