import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import { Colors } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getDaysInCurrentMonth = () => {
  const tmpDate = new Date();
  return new Date(tmpDate.getFullYear(), tmpDate.getMonth() + 1, 0).getDate();
};

const Summary = ({ transactions, initialAmount }) => {
  const day = new Date().getDate();
  const dayCountInMonth = getDaysInCurrentMonth();
  const todaysTransactions = transactions.filter((el) => {
    return new Date(el.datetime).getDate() == day;
  });
  const dailyLimit = Math.floor(initialAmount / dayCountInMonth);
  let todaySum = 0;
  todaysTransactions.forEach((el) => {
    if (el.type == "harcama") {
      todaySum -= el.amount;
    } else {
      todaySum += el.amount;
    }
  });
  todaySum = dailyLimit + todaySum;

  let totalSum = day * dailyLimit;
  transactions.forEach((el) => {
    if (el.type == "harcama") {
      totalSum -= el.amount;
    } else {
      totalSum += el.amount;
    }
  });
  //day * dailyLimit - (all transactions)
  return (
    <View>
      <View style={styles.summaryTop}>
        <Text
          style={{
            ...styles.summaryRemaining,
            color: todaySum > 0 ? Colors.green : Colors.red,
          }}
        >
          {todaySum > 0 ? "+" : ""}
          {todaySum} (Bugün)
        </Text>
        <Text style={styles.summaryDaily}>{dailyLimit}/gün</Text>
      </View>
      <Text
        style={{
          ...styles.summaryTotal,
          color: totalSum > 0 ? Colors.green : Colors.red,
        }}
      >
        {totalSum > 0 ? "+" : ""}
        {Math.floor(totalSum)}
      </Text>
    </View>
  );
};

const Inputs = ({ addTransaction }) => {
  const [tab, setTab] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const handleSave = () => {
    if (amount && description) {
      const amountInt = parseInt(amount);
      const type = tab;
      addTransaction(amountInt, description, type);
      setDescription("");
      setAmount("");
      setTab("");
    }
  };
  return (
    <View style={styles.inputs}>
      <View style={styles.inputsTabContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setTab("harcama");
          }}
          style={tab == "harcama" ? styles.inputsTabActive : styles.inputsTab}
        >
          <Text style={styles.inputsTabText}>HARCAMA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={tab == "tahsilat" ? styles.inputsTabActive : styles.inputsTab}
          onPress={() => {
            setTab("tahsilat");
          }}
        >
          <Text style={styles.inputsTabText}>TAHSİLAT</Text>
        </TouchableOpacity>
      </View>
      {tab != "" && (
        <View>
          <View>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.inputsDescription}
              placeholder="Açıklama"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
            }}
          >
            <TextInput
              value={amount}
              onChangeText={setAmount}
              style={styles.inputsAmount}
              placeholder="Miktar"
            />
            <TouchableOpacity onPress={handleSave} style={styles.inputsSubmit}>
              <Text style={styles.inputsTabText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const dateToString = (datetime) => {
  return new Date(datetime).toLocaleString("tr-TR");
};

const ListItem = ({ transaction }) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.widthWrapper}>
        <View style={styles.listItemTop}>
          <Text
            style={{
              ...styles.listItemTopAmount,
              color: transaction.type == "harcama" ? Colors.red : Colors.green,
            }}
          >
            {transaction.type == "harcama" ? "-" : "+"}
            {transaction.amount}
          </Text>
          <Text style={styles.listItemDate}>
            {dateToString(transaction.datetime)}
          </Text>
        </View>
        <Text style={{ color: "white" }}>{transaction.description}</Text>
      </View>
    </View>
  );
};

const List = ({ transactions }) => {
  return (
    <View style={styles.listContainer}>
      {transactions
        .sort((a, b) => a.datetime < b.datetime)
        .map((transaction, index) => (
          <ListItem key={index} transaction={transaction} />
        ))}
    </View>
  );
};

const Settings = ({ onReset, onInitialChange }) => {
  const [value, setValue] = useState("");
  return (
    <View
      style={{
        marginTop: 20,
        flex: 1,
        width: "100%",
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: 170,
          marginRight: 10,
          gap: 4,
        }}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          style={{ ...styles.inputsAmount, flex: 1, marginRight: 10 }}
          placeholder="Aylık"
        />
        <TouchableOpacity
          onLongPress={() => {
            if (value) {
              onInitialChange(parseInt(value));
            }
          }}
          style={styles.settingsButton}
        >
          <Text style={{ color: "white" }}>Kaydet</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onLongPress={onReset} style={styles.settingsButton}>
        <Text style={{ color: "white" }}>Sıfırla</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [initialAmount, setInitialAmount] = useState(1);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const f = async () => {
      const value = await AsyncStorage.getItem("transactions");
      if (value == null) {
        await AsyncStorage.setItem(
          "transactions",
          JSON.stringify(transactions)
        );
      } else {
        setTransactions(JSON.parse(value));
      }
    };
    f();
  }, []);

  useEffect(() => {
    const f = async () => {
      const initial = await AsyncStorage.getItem("initial");
      console.log(initial);
      if (initial == null) {
        await AsyncStorage.setItem("initial", initialAmount.toString());
      } else {
        setInitialAmount(parseInt(initial));
      }
    };
    f();
  }, []);

  useEffect(() => {
    const f = async () => {
      await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
    };
    f();
  }, [transactions]);

  useEffect(() => {
    const f = async () => {
      await AsyncStorage.setItem("initial", initialAmount.toString());
    };
    f();
  }, [initialAmount]);

  const reset = () => {
    setTransactions([]);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Settings onReset={reset} onInitialChange={setInitialAmount} />
        <Summary transactions={transactions} initialAmount={initialAmount} />
        <Inputs
          addTransaction={(amount, description, type) => {
            setTransactions([
              ...transactions,
              {
                amount: amount,
                description: description,
                type: type,
                datetime: new Date(),
              },
            ]);
          }}
        />
        <List transactions={transactions} />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
