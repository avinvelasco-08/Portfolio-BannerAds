<?php
$url = '../'.$_POST['url'];
$rootPath = realpath($url);
$zipfile = $rootPath.'/archive.zip';

// Initialize archive object
$zip = new ZipArchive();
$zip->open($zipfile, ZipArchive::CREATE | ZipArchive::OVERWRITE);

// Create recursive directory iterator
/** @var SplFileInfo[] $files */
$files =  new RecursiveDirectoryIterator($rootPath);
$fontsexts = array('woff','woff2','ttf','otf','svg','SVG','OTF','TTF','WOFF2','WOFF');
$exts = array('jpg','jpeg','png','gif','js','css','html','mp4','MP4','HTML','CSS','JS','JPG','JPEG','PNG','GIF');
$exts = array_merge($fontsexts, $exts);
foreach ($files as $name => $file)
{
    $ext = pathinfo( $name, PATHINFO_EXTENSION );
    
    if (in_array( $ext, $exts ))
    {
        $filePath = $file->getRealPath();
        // Add current file to archive
        $zip->addFile($filePath, basename($filePath));
        
    }
    
}

// Zip archive will be created only after closing object
$zip->close();
$fileSize =  round(filesize($zipfile)/1000).'kb';

echo $fileSize;
?>