import os
import glob
from PIL import Image

files = glob.glob('C:\\Users\hp072\Desktop\\archive\\DATASET\\TRAIN\\대표 tree2\\*.jpg')

for f in files:
    img = Image.open(f)
    img_resize = img.resize((int(480), int(360)))
    title, ext = os.path.splitext(f)
    img_resize.save(title+ ext)