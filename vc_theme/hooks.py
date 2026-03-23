from __future__ import unicode_literals

app_name = "vc_theme"
app_title = "VC Theme"
app_publisher = "VerityCore Consultancy (Pvt) Ltd"
app_description = "Enterprise UI theme for VerityPack"
app_email = "devs@veritycore.co.zw"
app_license = "mit"

# Include JS and CSS in desk (this is the key change)
app_include_js = ["/assets/vc_theme/js/vc_theme.js"]
app_include_css = ["/assets/vc_theme/css/vc_theme.css"]

# Remove web_include_js and web_include_css if they're causing issues
# web_include_js = []
# web_include_css = []

# After migrate hook
after_migrate = "vc_theme.hooks.after_migrate"

def after_migrate():
    """Called after migration"""
    pass