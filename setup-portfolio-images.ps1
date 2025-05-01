# PowerShell script to set up portfolio project directories

# Create project directories if they don't exist
$projectDirs = @("project1", "project2", "project3", "project4", "project5", "project6", "project7")

foreach ($dir in $projectDirs) {
    $path = "assets\projects\$dir"
    if (-not (Test-Path $path)) {
        Write-Host "Creating directory: $path"
        New-Item -Path $path -ItemType Directory -Force | Out-Null
    } else {
        Write-Host "Directory already exists: $path"
    }
}

Write-Host "`nPortfolio project directories have been created."
Write-Host "Please download the images from Google Drive and organize them as follows:"
Write-Host "- For each project, select 4 related images"
Write-Host "- Rename them to image1.jpg, image2.jpg, image3.jpg, and image4.jpg"
Write-Host "- Place them in the corresponding project folder"
Write-Host "`nGoogle Drive link: https://drive.google.com/drive/folders/1zvDC5f3Vz_q0relEH8umjrYT1MlKmJj8"
