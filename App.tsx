import React, { useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { sha256 } from "react-native-sha256";
import Data1 from "./DataModel1.json";
import Data2 from "./DataModel2.json";
import { SelectList } from "react-native-dropdown-select-list";
import MaskInput from "react-native-mask-input";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [result, setResult] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [selected, setSelected] = useState(true);

  const [numbers, setNumbers] = useState("");
  const [mean, setMean] = useState(0.0);
  const [median, setMedian] = useState("");
  const [standard, setStandard] = useState(0.0);
  const data = [
    { key: true, value: "Data Model 1" },
    { key: false, value: "Data Model 2" },
  ];
  useEffect(() => {
    convertToSHA();
  }, []);
  const convertToSHA = () => {
    if (input1 != "" && input2 != "") {
      var temp = "";
      for (var i = 0; i < Math.min(input1.length, input2.length); i++) {
        temp += input1[i] + input2[i];
      }
      sha256(temp).then((hash) => {
        setResult(hash);
      });
    }
  };
  const getValue = () => {
    if (numbers.length >= 5) {
      var temp: any = numbers.split('');
      for (var i = 0; i < temp.length; i++) {
        temp[i] = Number(temp[i]);
      }
      setMean(temp.reduce((a: number, b: number) => a + b) / temp.length);
      setMedian(getMedian(temp));
      setStandard(getStandardDeviation(temp));
    }
  };
  const getMedian = (arr: any) => {
    const mid = Math.floor(arr.length / 2), nums = [...arr].sort((a, b) => a - b);
    console.log(nums[mid])
    return nums[mid];
  };

  const getStandardDeviation = (array: any) => {
    const n = array.length;
    const mean = array.reduce((a: number, b: number) => a + b) / n;
    return Math.sqrt(
      array
        .map((x: number) => Math.pow(x - mean, 2))
        .reduce((a: number, b: number) => a + b) / n
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 25, textAlign: "center", color: "#D50000" }}>
          Code Challenge
        </Text>

        <SelectList
          setSelected={(val: boolean) => {
            setSelected(val);
          }}
          fontFamily="lato"
          data={data}
          save="key"
          search={false}
          boxStyles={{ marginTop: 20 }}
          defaultOption={{ key: "1", value: "Data Model 1" }}
          maxHeight={100}
        />
        {selected ? (
          <>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: -10,
                marginTop: 50,
              }}
            >
              {Data1.fields.x.label}
            </Text>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => {
                setInput1(text);
                convertToSHA();
              }}
              placeholder={Data1.fields.x.label}
              value={input1}
              editable={Data1.fields.x.editable}
            />
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: -10,
              }}
            >
              {Data1.fields.y.label}
            </Text>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => {
                setInput2(text);
                convertToSHA();
              }}
              placeholder={Data1.fields.y.label}
              value={input2}
              editable={Data1.fields.y.editable}
            />
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: -10,
              }}
            >
              {Data1.fields.sum.label}
            </Text>
            <TextInput
              style={styles.textareaStyle}
              placeholder={Data1.fields.sum.label}
              value={result}
              multiline
              numberOfLines={4}
              editable={Data1.fields.sum.editable}
            />
          </>
        ) : (
          <>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: -10,
                marginTop: 50,
              }}
            >
              {Data2.fields.numbers.label}
            </Text>
            <MaskInput
              value={numbers}
              onChangeText={(masked, unmasked) => {
                setNumbers(unmasked);
                getValue();
              }}
              mask={[
                /\d/,
                ",",
                /\d/,
                ",",
                /\d/,
                ",",
                /\d/,
                ",",
                /\d/,
                ",",
                /\d/,
                ",",
                /\d/,
                ",",
                /\d/,
                ",",
                /\d/,
                ",",
                /\d/,
              ]}
            />
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: -10,
              }}
            >
              {Data2.fields.mean.label}
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder={Data2.fields.mean.label}
              value={mean.toString()}
              editable={Data2.fields.mean.editable}
            />

            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: -10,
              }}
            >
              {Data2.fields.median.label}
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder={Data2.fields.median.label}
              value={median.toString()}
              editable={Data2.fields.median.editable}
            />

            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: -10,
              }}
            >
              {Data2.fields.standardDeviation.label}
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder={Data2.fields.standardDeviation.label}
              value={standard.toString()}
              editable={Data2.fields.standardDeviation.editable}
            />
          </>
        )}

        {/* <TouchableOpacity
          style={styles.touchableOpacityStyle}
          onPress={convertToSHA}>
 
          <Text style={styles.touchableOpacityText}> Click Here To Convert to SHA 256 </Text>
 
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },

  textInputStyle: {
    height: 40,
    width: 300,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  textareaStyle: {
    height: 100,
    width: 300,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },

  touchableOpacityStyle: {
    backgroundColor: "#33691E",
    height: 42,
    alignItems: "center",
    borderRadius: 7,
    justifyContent: "center",
    width: "100%",
  },

  touchableOpacityText: {
    color: "#FFFFFF",
    fontSize: 22,
  },
});

export default App;
