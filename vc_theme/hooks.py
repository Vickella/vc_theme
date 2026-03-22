app_name = "vc_theme"
app_title = "VC Theme"
app_publisher = "VerityCore Consultancy (Pvt) Ltd"
app_description = "Enterprise UI theme for VerityPack"
app_email = "devs@veritycore.co.zw"
app_license = "mit"

# Apps in this directory that are not in the apps.txt file
# This is a list of app names that will be treated as sub-apps
app_include_js = ["js/theme.js"]
app_include_css = ["css/theme.css"]

# Website JS and CSS
web_include_js = ["js/theme.js"]
web_include_css = ["css/theme.css"]

# After migrate hook
after_migrate = "your_theme_app.hooks.after_migrate"

def after_migrate():
    """Called after migration"""
    pass