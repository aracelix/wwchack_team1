#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include "DHT.h"
#include <Wire.h>
#include <Adafruit_GFX.h>
#include "Adafruit_LEDBackpack.h"

#define FIREBASE_HOST "wwc-hackathon.firebaseio.com"
#define FIREBASE_AUTH "D72HGIE1v0Oh5MkW7UY84LZH0eqqEiU42kEBkdU1"
//#define WIFI_SSID "WWCode"
//#define WIFI_PASSWORD "Hopper Lovelace Borg"
#define WIFI_SSID "CenturyLink7957"
#define WIFI_PASSWORD "k84db3c6cct6bd"

#define DHTPIN 2
#define DHTTYPE DHT22
#define HUMIDITY_THRESHOLD 75
#define CO2_THRESHOLD 34
#define WEIGHT_THRESHOLD 40
#define FIREBASE_WAIT 2000
#define READING_WAIT 10000

DHT humiditySensor(DHTPIN, DHTTYPE);
Adafruit_AlphaNum4 weightSensor = Adafruit_AlphaNum4();

void setup() {
  Serial.begin(9600);
  Serial.println("Trash application begin.");
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(5000);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  humiditySensor.begin();
  weightSensor.begin(0x70);
}

void loop() {
  float gasReading = checkGasSensor();
  float humidityReading = checkHumiditySensor();
  float weightReading = checkWeightSensor();

  const int capacity = JSON_OBJECT_SIZE(4);
  StaticJsonBuffer<capacity> dataBuffer;
  JsonObject& data = dataBuffer.createObject();
  //JsonObject& ts = data.createNestedObject("timestamp");
  data["c02"] = gasReading;
  data["humidity"] = humidityReading;
  data["weight"] = weightReading;
  //ts[".sv"] = "timestamp";

  String id = Firebase.push("data/feed", data);
  
  Serial.println();
  delay(READING_WAIT);
}

float checkGasSensor() {
  float co2SensorReading = analogRead(A0);
  Serial.print("C02 Reading: ");
  Serial.println(co2SensorReading);

  if(co2SensorReading > CO2_THRESHOLD) {
    sendAlert("co2", co2SensorReading);
  }

  return co2SensorReading;
}

float checkHumiditySensor() {
  float humidityReading = humiditySensor.readHumidity();

   if (isnan(humidityReading)) {
    Serial.println(F("Failed to read humidity from DHT sensor!"));
    return 0;
  }

  Serial.print("Humidity Reading: ");
  Serial.println(humidityReading);

  if(humidityReading > HUMIDITY_THRESHOLD) {
    sendAlert("humidity", humidityReading);
  }

  return humidityReading;
}

float checkWeightSensor() {
  int firstDigit = random(0, 6) + 48;
  int secondDigit = random(0, 9) + 48;
  int thirdDigit = random(0, 9) + 48;
  
  char weightDigits[4];
  weightDigits[0] = char(firstDigit);
  weightDigits[1] = char(secondDigit);
  weightDigits[3] = '.';
  weightDigits[4] = char(thirdDigit);

  float weightReading;
  sscanf(weightDigits, "%f", &weightReading);

  weightSensor.writeDigitAscii(0, firstDigit);
  weightSensor.writeDigitAscii(1, secondDigit);
  weightSensor.writeDigitRaw  (2, 0x4000);
  weightSensor.writeDigitAscii(3, thirdDigit);

  Serial.print("Weight reading: " );
  Serial.println(weightReading);

  weightSensor.writeDisplay();

  if(weightReading > WEIGHT_THRESHOLD) {
    sendAlert("weight", weightReading);
  }

  return weightReading;
}

void sendAlert(String type, float value) {
  const int capacity = JSON_OBJECT_SIZE(3);
  StaticJsonBuffer<capacity> dataBuffer;
  JsonObject& data = dataBuffer.createObject();
  //JsonObject& ts = data.createNestedObject("timestamp");
  data["type"] = type;
  data["value"] = value;
  //ts[".sv"] = "timestamp";

  String id = Firebase.push("data/alert", data);
  
  Serial.println("Over threshold. Sending alert."); 
  
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }
}
