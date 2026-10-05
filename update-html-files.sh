#!/bin/bash
# Update all HTML files with analytics and remove AdSense

FILES="casestudy.html pfcloud-casestudy.html qanoonbridgecasestudy.html sales-finance-casestudy.html salesplateformcasestudy.html blogs.html blog-post.html philosophy.html philosophy-post.html"

for file in $FILES; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Remove AdSense script if present
        sed -i '/<script.*adsbygoogle.*<\/script>/d' "$file"
        sed -i '/pagead2\.googlesyndication\.com/d' "$file"
        
        # Add analytics script before </body> if not already present
        if ! grep -q "analytics.js" "$file"; then
            sed -i 's|</body>|<!-- Analytics Script -->\n<script src="analytics.js"></script>\n</body>|' "$file"
        fi
        
        # Add GA4 script in head if not present
        if ! grep -q "googletagmanager.com/gtag" "$file"; then
            sed -i 's|</head>|<!-- Google Analytics 4 -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n</head>|' "$file"
        fi
        
        # Fix x.com/yourprofile links
        sed -i 's|https://x\.com/yourprofile|https://x.com/Jawad_9938|g' "$file"
        sed -i 's|https://twitter\.com/yourprofile|https://x.com/Jawad_9938|g' "$file"
        
        # Fix terms.html links
        sed -i 's|<a href="terms\.html">Terms</a> ||g' "$file"
        
        # Fix #Testimonials links
        sed -i 's|#Testimonials|salesplateformcasestudy.html|g' "$file"
        
        echo "Done with $file"
    fi
done

echo "All files processed!"
