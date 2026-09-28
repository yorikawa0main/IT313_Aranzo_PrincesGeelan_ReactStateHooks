import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';



function useStopwatch(isRunning) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return seconds;
}



function PracticeTracker({ solved, onSolve, onReset }) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Practice Tracker</Text>

      <Text style={styles.solvedText}>
        Solved: {solved}
      </Text>

      {solved >= 5 && (
        <Text style={styles.greatJob}>
          Great job!
        </Text>
      )}

      <Pressable
        style={styles.primaryButton}
        onPress={onSolve}
      >
        <Text style={styles.buttonText}>
          Solve +1
        </Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={onReset}
      >
        <Text style={styles.buttonText}>
          Reset
        </Text>
      </Pressable>
    </View>
  );
}



function Stopwatch({ seconds, isRunning }) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(2, '0')}:` +
    `${String(remainingSeconds).padStart(2, '0')}`;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Lab Stopwatch</Text>

      <Text style={styles.timer}>
        {formattedTime}
      </Text>

      {isRunning ? (
        <Text style={styles.statusRunning}>
          Running...
        </Text>
      ) : (
        <Text style={styles.statusPaused}>
          Paused
        </Text>
      )}
    </View>
  );
}



function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  const handleSolve = () => {
    setSolved((s) => s + 1);
  };

  const handleReset = () => {
    setSolved(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Lab Timer & Practice Tracker
      </Text>

      <PracticeTracker
        solved={solved}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      <Stopwatch
        seconds={seconds}
        isRunning={isRunning}
      />

      <View style={styles.controls}>
        <Pressable
          style={styles.startButton}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>
            Start
          </Text>
        </Pressable>

        <Pressable
          style={styles.stopButton}
          onPress={handleStop}
        >
          <Text style={styles.buttonText}>
            Stop
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}



export default function App() {
  return <LabScreen />;
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 22,
    color: '#0B1F3A',
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 20,
    marginBottom: 16,

    shadowColor: '#0B1F3A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#17365D',
    letterSpacing: 0.3,
  },

  solvedText: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    color: '#0B1F3A',
  },

  greatJob: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#15803D',
  },

  timer: {
    fontSize: 50,
    fontWeight: '800',
    textAlign: 'center',
    color: '#0B1F3A',
    marginBottom: 8,
    letterSpacing: 1,
  },

  statusRunning: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2563EB',
  },

  statusPaused: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#64748B',
  },

  primaryButton: {
    backgroundColor: '#123B6D',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,

    shadowColor: '#123B6D',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 3,
  },

  secondaryButton: {
    backgroundColor: '#64748B',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  startButton: {
    backgroundColor: '#123B6D',
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    marginRight: 6,

    shadowColor: '#123B6D',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 3,
  },

  stopButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    marginLeft: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  controls: {
    flexDirection: 'row',
    marginTop: 4,
  },
});