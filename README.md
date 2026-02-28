# Manis Bill Application

This is a small static web app to generate weekly milk bills. It is plain HTML/CSS/JS and can be hosted on GitHub Pages.

Quick steps to publish to GitHub Pages (recommended):

1. Initialize a local git repository (if you haven't):

```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a repository on GitHub (e.g. `Manis-Bill-Application`) and add remote:

```bash
git remote add origin https://github.com/<your-username>/Manis-Bill-Application.git
git branch -M main
git push -u origin main
```

3. This repository contains a GitHub Actions workflow that will publish the site to the `gh-pages` branch automatically on every push to `main`.

4. Wait a minute after the push, then open:

```
https://<your-username>.github.io/Manis-Bill-Application/
```

Notes:
- If your repository is named differently, replace the URL accordingly.
- The app uses CDN links for `jsPDF` and `autotable`. If you want complete offline use on a phone, download those scripts and reference them locally.
- If GitHub Actions is blocked by your organization, you can alternatively use the `gh-pages` branch manually or host on any static hosting (Netlify, Vercel, Surge).

Offline (mobile) usage
----------------------
To make the app run fully offline (so you can open it on your phone without internet), fetch the required vendor scripts locally:

```powershell
powershell -ExecutionPolicy Bypass -File fetch-vendor.ps1
```

This downloads `jspdf.umd.min.js` and `jspdf.plugin.autotable.min.js` into a `vendor/` folder and the app will prefer those local files automatically.

If you prefer, you can also manually download the files from the CDNs and place them into `vendor/`.

If you want, I can also create a minimal `.gitignore` and update the workflow to publish a subfolder — tell me where you'd like the site published.
# Manis Milk - Bill Generator

A simple and elegant web application for managing weekly milk delivery records and generating customer bills.

## Features

✨ **Key Features:**
- ✅ Add weekly milk delivery records with customer details
- ✅ Store all records in browser local storage (persistent)
- ✅ View detailed bill information for each record
- ✅ Download bills as PDF files
- ✅ Edit existing records
- ✅ Delete individual records
- ✅ Clear all records at once
- ✅ View summary statistics (total records, revenue, milk quantity)
- ✅ Responsive design - works on desktop, tablet, and mobile
- ✅ No installation required - open in any web browser

## How to Use

### 1. Opening the Application
Simply open `index.html` in your web browser:
- Double-click `index.html`, or
- Right-click → Open with → Your preferred browser

### 2. Adding a Record
1. Fill in the form with:
   - **Customer Name**: Name of the milk customer
   - **Week Ending Date**: Date marking the end of the delivery week
   - **Milk Amount**: Total liters delivered (supports decimal values like 5.5)
   - **Price per Liter**: Cost per liter in rupees (₹)
2. Click "Add Record" button
3. Record will be saved automatically

### 3. Viewing Your Records
All records are displayed in the "Weekly Records" section:
- Shows customer name, date, quantity, price, and total amount
- Records are sorted by date (newest first)
- Displays four action buttons for each record

### 4. Viewing a Bill
- Click the **"View Bill"** button on any record
- A detailed bill will appear in a modal window
- The bill includes:
  - Customer name and delivery date
  - Quantity and pricing details
  - Total amount due
  - Formatted for printing/PDF download

### 5. Downloading a Bill as PDF
1. View the bill (See "Viewing a Bill" section above)
2. Click the **"Download as PDF"** button
3. The bill will be downloaded to your Downloads folder
4. File name format: `bill-CustomerName-YYYY-MM-DD.pdf`

### 6. Editing a Record
1. Click the **"Edit"** button on the record
2. The form will be filled with the record's data
3. The record will be deleted from the list
4. Modify the values as needed
5. Click "Add Record" to save the updated version

### 7. Deleting a Record
1. Click the **"Delete"** button on the record
2. Confirm the deletion when prompted
3. The record will be permanently removed

### 8. Clearing All Records
- Click the **"Clear All"** button in the Weekly Records section
- Confirm when prompted
- All records will be deleted (⚠️ This action cannot be undone)

## Data Storage

Records are stored in your browser's **Local Storage**:
- Data persists between browser sessions
- Data is unique to each browser and device
- Clearing browser cache/cookies will delete all records
- To backup: Take screenshots or save exported PDFs

## Browser Compatibility

✅ Works with:
- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
Manis Bill Application/
├── index.html          # Main HTML file
├── styles.css          # Styling (modern UI with gradients)
├── app.js             # JavaScript logic and functionality
├── README.md          # This file
└── .github/
    └── copilot-instructions.md
```

## Features in Detail

### Summary Dashboard
Shows three key metrics:
- **Total Records**: Number of customer records stored
- **Total Revenue**: Sum of all bill amounts (₹)
- **Total Milk**: Sum of all milk quantities (Liters)

### Form Validation
- All fields are required
- Quantity and price must be positive numbers
- Invalid entries are prevented with user-friendly messages

### Notifications
- Toast messages appear for successful actions
- Green for success, red for errors
- Auto-dismiss after 3 seconds

### Responsive Design
- Adapts to different screen sizes
- Mobile-friendly layout
- Touch-friendly buttons

## Tips and Tricks

💡 **Pro Tips:**
1. **Weekly Billing**: Update records every Friday/Saturday for the past week
2. **Bulk Operations**: Use "Clear All" only when you've backed up important records
3. **Customer Tracking**: Keep different browsers for different customers if needed
4. **Backup Bills**: Save important PDFs to your computer
5. **Print Bills**: Use browser print (Ctrl+P) for direct printing

## Troubleshooting

### Records Not Saving?
- Check if local storage is enabled in your browser
- Try a different browser
- Clear browser cache and try again

### PDF Download Not Working?
- Ensure JavaScript is enabled
- Try a different browser
- Check your download folder for the file

### Can't Find My Records?
- Records are stored per browser - try the same browser
- Check if you're in private/incognito mode (data won't persist)
- Records are stored locally - switching devices won't transfer data

## Future Enhancements

Possible features for future versions:
- Backend storage with server synchronization
- Customer database with history tracking
- Automatic weekly reminders
- Export records to Excel/CSV
- Multi-user support with authentication
- Email bill delivery
- Payment tracking
- Monthly invoicing

## Security Note

⚠️ **Important**: This application stores data locally in your browser:
- No data is sent to any server
- Your data stays on your device
- Clear your records before lending your device to others
- Local storage can be accessed by device users

## Support

For issues or suggestions:
1. Check the Troubleshooting section above
2. Ensure you're using a modern web browser
3. Try disabling browser extensions

## License

This application is provided as-is for personal use.

---

**Version**: 1.0
**Last Updated**: February 2026
**Made with ❤️ for Manis Milk Delivery**
