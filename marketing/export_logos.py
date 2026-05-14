import os
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM

def export_logo(svg_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    drawing = svg2rlg(svg_path)
    
    # Export PNG (High Res)
    png_path = os.path.join(output_dir, "BIGWEB_Logo_Primary.png")
    renderPM.drawToFile(drawing, png_path, fmt="PNG", dpi=600)
    print(f"Exported: {png_path}")
    
    # Export JPG
    jpg_path = os.path.join(output_dir, "BIGWEB_Logo_Primary.jpg")
    # JPG doesn't support transparency, so we might need to handle background if desired, 
    # but renderPM handles it with white by default usually.
    renderPM.drawToFile(drawing, jpg_path, fmt="JPG", dpi=300)
    print(f"Exported: {jpg_path}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(__file__))
    logo_dir = os.path.join(base_dir, "logo")
    logo_svg = os.path.join(logo_dir, "05_logo_horizontal_light_bg.svg")
    
    export_logo(logo_svg, logo_dir)
