import math
#10
shoulderL_X= 278.8211807666586
shoulderL_Y=93.53402104359193
shoulderR_X =208.4660464038181
shoulderR_Y =95.72172528574902
elbowL_X =309.8080123723249
elbowL_Y =143.17855894333658
elbowR_X =178.17480183760944
elbowR_Y =142.68551362627676
wristL_X =264.24182461393485
wristL_Y =135.72395770002433
wristR_X =232.45648217108464
wristR_Y =138.33766358371838
hipL_X =272.91689149136675
hipL_Y=191.19955693701363
hipR_X =223.16626641536965
hipR_Y=189.65845011551556
kneeL_X =351.6433513953064
kneeL_Y =244.37318556967415
kneeR_X =145.46673607733464
kneeR_Y=247.29110302164395
ankleL_X=332.11749718810796
ankleL_Y=318.7508264682636
ankleR_X=147.6103240135579
ankleR_Y=328.70563670355057

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


