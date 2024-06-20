import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getDatabase } from '../db/db';

export default function TesteScreen({ navigation }) {
  const [pings, setPings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM tb_ping_pong',
            [],
            (_, { rows }) => {
              setPings(rows.raw());
            },
            (tx, error) => {
              console.error(error);
            }
          );
        });
      } catch (error) {
        console.error("Error fetching data from database", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Teste Screen</Text>
      {pings.map((ping, index) => (
        <Text key={index}>{JSON.stringify(ping)}</Text>
      ))}
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
