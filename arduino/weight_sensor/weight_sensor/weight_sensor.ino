// Demo the quad alphanumeric display LED backpack kit
// scrolls through every character, then scrolls Serial
// input onto the display

#include <Wire.h>
#include <Adafruit_GFX.h>
#include "Adafruit_LEDBackpack.h"

Adafruit_AlphaNum4 alpha4 = Adafruit_AlphaNum4();

void setup() {
  
  Serial.begin(9600);
  
  alpha4.begin(0x70);  // pass in the address





}

void loop() {
  int randNumber = random(0, 6);
 int randNumber2 = random(0, 9);
  
  // put your main code here, to run repeatedly:
  alpha4.writeDigitAscii(0, randNumber + 48);
  alpha4.writeDigitAscii(1, randNumber2 + 48);
  alpha4.writeDigitRaw  (2, 0x4000);
  alpha4.writeDigitAscii(3, randNumber2 + 48);
  alpha4.writeDisplay();

 delay(300);
}
