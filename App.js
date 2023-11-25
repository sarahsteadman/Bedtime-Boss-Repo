import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


export default function App() {

  const [time, setTime] = useState('');
  const [PM, setPM] = useState(false);
  const [AM, setAM] = useState(false);

  function onChange(textValue) {
    setTime(textValue);
    console.log(time);
  }

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        alert('Permission to receive notifications was denied.');
      }
    };

    // Call the requestPermission function when the component mounts
    requestPermission();
  }, []);

  function setAlarm(textValue) {
    if (/^(0\d|1[0-2]):([0-5]\d)$/.test(textValue)) {
      if (AM || PM) {
        alert('Alarm set for ' + textValue);

        const notificationTime = new Date();

        const [hours, minutes] = textValue.split(':');

        if (PM) {
          notificationTime.setHours(parseInt(hours, 10) + 12);
        }
        else {
          notificationTime.setHours(parseInt(hours, 10));
        }

        notificationTime.setMinutes(parseInt(minutes, 10));

        scheduleNotification(notificationTime);

      }
      else {
        alert("Select AM or PM");
      }
    } else {
      alert(textValue + " is not a valid input. Please enter a time in the format HH:MM");
      console.log("Current textvalue: " + textValue);
    }
  }

  async function scheduleNotification(notificationTime) {
    await notifee.createTriggerNotification({
      content: {
        title: 'Bedtime Reminder',
        body: 'It\'s time to go to bed!',
      },
      trigger: {
        // date: notificationTime,
        type: TriggerType.TIMESTAMP,
        timestamp: notificationTime.getTime(),
      },
    });
  };

  function pmSelected() {
    setPM(true);
    setAM(false);
    console.log("a");
  }

  function amSelected() {
    setAM(true);
    setPM(false);
    console.log("b");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.labels}>Bedtime?</Text>
      <TextInput
        placeholder="10:00"
        style={styles.input}
        onChangeText={(text) => onChange(text)}>
      </TextInput>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.buttons, AM && styles.selectedButton]}
          onPress={() => amSelected()}>
          <Text>AM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, PM && styles.selectedButton]}
          onPress={() => pmSelected()}>
          <Text>PM</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttons}>
        <Text
          style={styles.buttonText}
          onPress={() => setAlarm(time)}>Set Alarm</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
const requestPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Permission to receive notifications was denied.');
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0B0FF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  labels: {
    width: '78%',
    fontSize: 37,
    marginBottom: 5,
    textAlign: 'center',
  },
  buttons: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Arial',
  },
  selectedButton: {
    backgroundColor: 'gray',
  },
});
