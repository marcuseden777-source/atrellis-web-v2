import os
import glob
from rembg import remove
from PIL import Image

logo_dir = "/Users/marcus/Desktop/atrellis-web/assets/trustbar_logos"
files = glob.glob(os.path.join(logo_dir, "*.*"))

for file_path in files:
    if file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
        print(f"Processing {file_path}...")
        input_image = Image.open(file_path)
        
        # Remove background using rembg
        # Note: rembg preserves the colors and removes the background cleanly
        output_image = remove(input_image)
        
        # Determine the new filename (must be .png to preserve transparency)
        file_name, ext = os.path.splitext(file_path)
        new_file_path = file_name + "_nobg.png"
        
        output_image.save(new_file_path, "PNG")
        print(f"Saved to {new_file_path}")

print("Done processing all logos.")
