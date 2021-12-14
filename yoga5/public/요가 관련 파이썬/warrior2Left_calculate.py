import math
shoulderL_X= 240.98064164336088
shoulderL_Y=79.75449142752916
shoulderR_X =190.18710101532102
shoulderR_Y =79.325417603964
elbowL_X =293.33970125547177
elbowL_Y =88.02112006398954
elbowR_X =135.25462822227627
elbowR_Y =84.44804317014227
wristL_X =342.74294272099951
wristL_Y =85.01867058304964
wristR_X =93.7070492993069
wristR_Y =79.49885244406613
hipL_X =238.1868426252432
hipL_Y=192.37407378556662
hipR_X =202.6688275170234
hipR_Y=198.99502029122081
kneeL_X =302.95238592838035
kneeL_Y =260.62894329857734
kneeR_X =142.86423691330253
kneeR_Y=211.7153937788789
ankleL_X=352.9835257326119
ankleL_Y=308.9811698230788
ankleR_X=141.3408963095817
ankleR_Y=308.2710359922179

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


print("kneeL",kneeFlexionL)
print("kneeR",kneeFlexionR)
print("hipL",hipFlexionL)
print("hipR",hipFlexionR)
print("elbowL",elbowFlexionL)
print("elbowR",elbowFlexionR)
print("shoulderL",shoulderFlexionL)
print("shoulderR",shoulderFlexionR)


