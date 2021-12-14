import os

file_path = 'C:\\Users\hp072\Desktop\\archive\\DATASET\\TRAIN\\대표 tree2'
file_names = os.listdir(file_path)

i = 1
for name in file_names:
    src = os.path.join(file_path, name)
    dst = 'tree2_'+str(i) + '.jpg'
    dst = os.path.join(file_path, dst)
    os.rename(src, dst)
    i += 1