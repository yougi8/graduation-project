import math
shoulderL_X= 328.98064164336088
shoulderL_Y=229.75449142752916
shoulderR_X =308.18710101532102
shoulderR_Y =235.325417603964
elbowL_X =319.33970125547177
elbowL_Y =347.02112006398954
elbowR_X =315.25462822227627
elbowR_Y =341.44804317014227
wristL_X =314.74294272099951
wristL_Y =440.01867058304964
wristR_X =314.7070492993069
wristR_Y =445.49885244406613
hipL_X =216.1868426252432
hipL_Y=316.37407378556662
hipR_X =192.6688275170234
hipR_Y=305.99502029122081
kneeL_X =175.95238592838035
kneeL_Y =425.62894329857734
kneeR_X =160.86423691330253
kneeR_Y=420.7153937788789
ankleL_X=110.9835257326119
ankleL_Y=406.9811698230788
ankleR_X=122.3408963095817
ankleR_Y=408.2710359922179

kneeFlexionL = (abs((math.atan2(ankleL_Y - kneeL_Y, ankleL_X - kneeL_X)) + abs(
    math.atan2(hipL_Y - kneeL_Y, hipL_X - kneeL_X)))) * (180 / math.pi)
kneeFlexionR = 360 - (abs((math.atan2(ankleR_Y - kneeR_Y, ankleR_X - kneeR_X)) + abs(
    math.atan2(hipR_Y - kneeR_Y, hipR_X - kneeR_X)))) * (180 / math.pi)

hipFlexionL = (abs(math.atan2(kneeL_Y - hipL_Y, kneeL_X - hipL_X)) + abs(
    math.atan2(shoulderL_Y - hipL_Y, shoulderL_X - hipL_X))) * (180 / math.pi)
hipFlexionR = 360 - (abs(math.atan2(kneeR_Y - hipR_Y, kneeR_X - hipR_X)) + abs(
    math.atan2(shoulderR_Y - hipR_Y, shoulderR_X - hipR_X))) * (180 / math.pi)

elbowFlexionL = (abs(math.atan2(wristL_Y - elbowL_Y, wristL_X - elbowL_X)) + abs(
    math.atan2(shoulderL_Y - elbowL_Y, shoulderL_X - elbowL_X))) * (180 / math.pi)
elbowFlexionR = 360 - (abs(math.atan2(wristR_Y - elbowR_Y, wristR_X - elbowR_X)) + abs(
    math.atan2(shoulderR_Y - elbowR_Y, shoulderR_X - elbowR_X))) * (180 / math.pi)

shoulderFlexionL = (abs(math.atan2(hipL_Y - shoulderL_Y, hipL_X - shoulderL_X)) + abs(
    math.atan2(elbowL_Y - shoulderL_Y, elbowL_X - shoulderL_X))) * (180 / math.pi)
shoulderFlexionR = 360 - (abs(math.atan2(hipR_Y - shoulderR_Y, hipR_X - shoulderR_X)) + abs(
    math.atan2(elbowR_Y - shoulderR_Y, elbowR_X - shoulderR_X))) * (180 / math.pi)


print(kneeFlexionL)
print(kneeFlexionR)
print(hipFlexionL)
print(hipFlexionR)
print(elbowFlexionL)
print(elbowFlexionR)
print(shoulderFlexionL)
print(shoulderFlexionR)


