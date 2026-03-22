from __future__ import unicode_literals

app_name = "vc_theme"
app_title = "VC Theme"
app_publisher = "VerityCore Consultancy (Pvt) Ltd"
app_description = "Enterprise UI theme for VerityPack"
app_email = "devs@veritycore.co.zw"
app_license = "mit"

# Include JS and CSS for desk
app_include_js = ["js/vc_theme.js"]
app_include_css = ["css/vc_theme.css"]

# After migrate hook
after_migrate = "vc_theme.hooks.after_migrate"

def after_migrate():
    """Called after migration"""
    pass
