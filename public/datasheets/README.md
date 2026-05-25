# Product Datasheets

Datasheets can be served from this folder or from **Vercel Blob**.  
If `VITE_BLOB_STORAGE_BASE_URL` is set (e.g. in Vercel), product datasheet links use that blob store; otherwise they fall back to files in this folder.

## How to add a datasheet

1. **Add the PDF file**  
   Put your PDF in this folder. Use the product ID as the filename for consistency, e.g.:
   - `s1.pdf` for product id `s1`
   - `el2.pdf` for product id `el2`

2. **Set the URL in Admin**  
   - Go to **Admin** → edit the product  
   - In **Datasheet URL** enter: `/datasheets/your-file.pdf`  
   - Save  

The "Download Datasheet" button on that product page will then start a direct download of the PDF.

You can also use a full URL (e.g. from Google Drive or your server) if you host the PDF elsewhere.
