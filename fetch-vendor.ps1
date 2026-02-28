# Fetch required vendor scripts for offline use
# Run this from the project root in PowerShell:
# powershell -ExecutionPolicy Bypass -File fetch-vendor.ps1

$files = @{
    'vendor/jspdf.umd.min.js' = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    'vendor/jspdf.plugin.autotable.min.js' = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js'
}

if (!(Test-Path -Path "vendor")){
    New-Item -ItemType Directory -Path "vendor" | Out-Null
}

foreach ($path in $files.Keys) {
    $url = $files[$path]
    Write-Host "Downloading $url -> $path"
    try {
        Invoke-WebRequest -Uri $url -OutFile $path -UseBasicParsing -ErrorAction Stop
    } catch {
        Write-Warning "Failed to download $url : $_"
    }
}

Write-Host "Done. Vendor files are in the ./vendor folder."
